# Sitio web de Escuela Las Canteras

Sitio web institucional de la Escuela Las Canteras de Copiapó, Región de Atacama, Chile.

El proyecto presenta información institucional, noticias, documentos públicos, datos de contacto y accesos a recursos educativos de la comunidad escolar.

## Sitio publicado

https://www.escuelalascanterascopiapo.cl/

## Características

- diseño adaptable a computadores, tabletas y teléfonos;
- navegación institucional unificada;
- carrusel de noticias;
- galería de imágenes;
- páginas de noticias;
- documentos institucionales en PDF;
- información de contacto y ubicación;
- integración con recursos externos, como Biblioteca Digital Escolar e Intranet;
- publicación estática mediante GitHub Pages.

## Tecnologías

- HTML5;
- CSS3;
- JavaScript;
- GitHub Pages;
- dominio personalizado mediante `CNAME`.

El proyecto no utiliza backend, base de datos ni sistema de autenticación propio.

## Estructura principal

```text
.
├── assets/
│   ├── img/
│   ├── logos/
│   └── pdf/
├── contacto.html
├── escuela.html
├── index.html
├── main.js
├── noticia-*.html
├── sello.html
├── styles.css
├── CNAME
└── .nojekyll
```

## Ejecución local

Clonar el repositorio:

```bash
git clone https://github.com/1uch0-Cop/escuela-las-canteras-web.git
cd escuela-las-canteras-web
```

Se puede abrir `index.html` directamente en un navegador o iniciar un servidor local:

```bash
python3 -m http.server 8000
```

Luego visitar:

```text
http://localhost:8000
```

## Validaciones recomendadas

Comprobar la sintaxis de JavaScript:

```bash
node --check main.js
```

Comprobar problemas de formato Git:

```bash
git diff --check
```

Validar los documentos HTML con HTML Tidy:

```bash
for archivo in *.html; do
  tidy -quiet -errors -utf8 "$archivo"
done
```

## Privacidad y contenido escolar

Las imágenes y contenidos del sitio corresponden a actividades institucionales.

Antes de incorporar nuevos recursos se recomienda:

- comprobar que exista autorización institucional para su publicación;
- evitar nombres completos y antecedentes personales innecesarios;
- eliminar metadatos EXIF, XMP, IPTC y coordenadas GPS;
- no publicar contraseñas, credenciales ni documentos internos;
- optimizar las imágenes antes de incorporarlas al repositorio.

## Contribuciones

Las contribuciones deben realizarse mediante ramas independientes y Pull Requests.

Consulte [CONTRIBUTING.md](CONTRIBUTING.md).

## Seguridad

Los problemas de seguridad o privacidad no deben publicarse inicialmente como una incidencia pública.

Consulte [SECURITY.md](SECURITY.md).

## Licencia

El código fuente y los archivos técnicos se distribuyen bajo la licencia [GNU General Public License v3.0 o posterior](LICENSE).

Las fotografías, logotipos, documentos PDF, textos institucionales y demás recursos indicados en [ASSETS-LICENSE.md](ASSETS-LICENSE.md) no están cubiertos automáticamente por la GPL.

## Autoría técnica

Proyecto mantenido públicamente por [1uch0-Cop](https://github.com/1uch0-Cop).

Sitio desarrollado en colaboración con Hackcop.
