# Guía para contribuir

Gracias por contribuir al sitio web de Escuela Las Canteras.

## Flujo de trabajo

1. Crear una rama desde `main`.
2. Realizar cambios pequeños y claramente identificables.
3. Verificar enlaces, sintaxis y recursos.
4. Crear commits descriptivos.
5. Enviar un Pull Request para revisión.

Ejemplo:

```bash
git switch main
git pull --ff-only
git switch -c fix/nombre-del-cambio
```

## Validaciones mínimas

Antes de enviar cambios:

```bash
node --check main.js
git diff --check
```

También se recomienda validar los HTML:

```bash
for archivo in *.html; do
  tidy -quiet -errors -utf8 "$archivo"
done
```

## Fotografías y datos personales

No deben incorporarse fotografías o datos personales sin autorización institucional.

Antes de agregar una imagen:

- eliminar coordenadas GPS y metadatos personales;
- reducir sus dimensiones y peso;
- utilizar nombres de archivo descriptivos;
- agregar un texto alternativo apropiado;
- evitar identificar innecesariamente a estudiantes.

## Contenido institucional

No modificar reglamentos, documentos oficiales, información de contacto o comunicaciones institucionales sin autorización.

## Estilo de commits

Utilizar mensajes claros y breves, por ejemplo:

```text
Fix broken institutional links
Update school contact information
Optimize gallery images
Add accessibility labels
```

## Licencias

Al contribuir código, se acepta que este sea distribuido bajo GPL-3.0-or-later.

Los recursos institucionales conservan las restricciones indicadas en `ASSETS-LICENSE.md`.
