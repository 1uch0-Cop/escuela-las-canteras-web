#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later

from __future__ import annotations

from collections import defaultdict
from hashlib import sha256
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys


ROOT = Path(__file__).resolve().parent.parent
HTML_FILES = sorted(ROOT.glob("*.html"))
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".ico"}
IGNORED_PREFIXES = ("#", "mailto:", "tel:", "data:", "javascript:")
FORBIDDEN_HTML_TEXT = {
    "data-netlify": "configuración antigua de Netlify Forms",
    "netlify-honeypot": "configuración antigua de Netlify Forms",
    'href="intranet.html"': "enlace local inexistente a la Intranet",
    "contacto@escuelalascanterascopiapo.cl": "correo institucional antiguo",
    "luis.jofre@": "correo personal",
}


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[tuple[str, str, str]] = []
        self.lang = ""
        self.title_parts: list[str] = []
        self.description = ""
        self._inside_title = False

    def handle_starttag(
        self,
        tag: str,
        attrs: list[tuple[str, str | None]],
    ) -> None:
        attributes = dict(attrs)

        if tag == "html":
            self.lang = (attributes.get("lang") or "").strip()

        if tag == "title":
            self._inside_title = True

        if (
            tag == "meta"
            and (attributes.get("name") or "").lower() == "description"
        ):
            self.description = (attributes.get("content") or "").strip()

        for name in ("href", "src"):
            value = attributes.get(name)
            if value:
                self.references.append((tag, name, value.strip()))

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._inside_title = False

    def handle_data(self, data: str) -> None:
        if self._inside_title:
            value = " ".join(data.split())
            if value:
                self.title_parts.append(value)

    @property
    def title(self) -> str:
        return " ".join(self.title_parts).strip()


def check_html(errors: list[str]) -> None:
    for path in HTML_FILES:
        text = path.read_text(encoding="utf-8")
        parser = SiteParser()
        parser.feed(text)

        if parser.lang != "es":
            errors.append(f"{path.name}: lang debe ser 'es'.")

        if not parser.title:
            errors.append(f"{path.name}: falta <title>.")

        if not parser.description:
            errors.append(f"{path.name}: falta meta description.")

        for token, description in FORBIDDEN_HTML_TEXT.items():
            if token in text:
                errors.append(f"{path.name}: {description}: {token}")

        for tag, attribute, reference in parser.references:
            if not reference or reference.startswith(IGNORED_PREFIXES):
                continue

            parsed = urlsplit(reference)
            if parsed.scheme or parsed.netloc:
                continue

            local_path = unquote(parsed.path).lstrip("/")
            if not local_path:
                continue

            target = ROOT / local_path
            if not target.exists():
                errors.append(
                    f"{path.name}: {tag}[{attribute}] apunta a "
                    f"un recurso inexistente: {reference}"
                )


def check_markdown_links(errors: list[str]) -> None:
    pattern = re.compile(r"\[[^\]]+\]\(([^)]+)\)")

    for path in sorted(ROOT.glob("*.md")):
        text = path.read_text(encoding="utf-8")

        for target in pattern.findall(text):
            target = target.strip()

            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue

            local_path = unquote(target.split("#", 1)[0])
            if local_path and not (ROOT / local_path).exists():
                errors.append(
                    f"{path.name}: enlace Markdown inexistente: {target}"
                )


def check_duplicate_images(errors: list[str]) -> None:
    groups: defaultdict[str, list[Path]] = defaultdict(list)

    for path in sorted((ROOT / "assets").rglob("*")):
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS:
            digest = sha256(path.read_bytes()).hexdigest()
            groups[digest].append(path.relative_to(ROOT))

    for paths in groups.values():
        if len(paths) > 1:
            joined = ", ".join(str(path) for path in paths)
            errors.append(f"Imágenes duplicadas exactas: {joined}")


def check_required_files(errors: list[str]) -> None:
    required = [
        "README.md",
        "LICENSE",
        "ASSETS-LICENSE.md",
        "CONTRIBUTING.md",
        "SECURITY.md",
        "CODE_OF_CONDUCT.md",
        "CNAME",
        ".nojekyll",
        "main.js",
        "styles.css",
    ]

    for filename in required:
        if not (ROOT / filename).exists():
            errors.append(f"Falta el archivo requerido: {filename}")

    cname = ROOT / "CNAME"
    if cname.exists():
        expected = "www.escuelalascanterascopiapo.cl"
        actual = cname.read_text(encoding="utf-8").strip()
        if actual != expected:
            errors.append(
                f"CNAME inesperado: '{actual}'. Se esperaba '{expected}'."
            )


def main() -> int:
    errors: list[str] = []

    check_required_files(errors)
    check_html(errors)
    check_markdown_links(errors)
    check_duplicate_images(errors)

    if errors:
        print("Validación fallida:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        f"Validación correcta: {len(HTML_FILES)} HTML, "
        "enlaces locales, metadatos, documentación e imágenes."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
