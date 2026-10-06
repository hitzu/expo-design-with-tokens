# expo-design-tokens

Repo de la plática **"Design Tokens y multitenancy visual"**: dos clientes con estética opuesta, el mismo código, y un solo archivo de temas.

Repo: [github.com/hitzu/expo-design-with-tokens](https://github.com/hitzu/expo-design-with-tokens)

> *Si tu componente dice "rosa", solo sirve para un cliente. Si dice "acento", sirve para todos.*

## Cómo correrlo

```bash
cd demo
npm install
npm run dev
```

Sin backend, sin variables de entorno, sin peticiones de red.

Las slides son un solo archivo: abre `slides/index.html` en el navegador (`→`/`←` para navegar, `t` para cambiar el tema de las propias slides).

## Qué hay aquí

| Carpeta | Contenido |
|---|---|
| `demo/` | Vite + React. Dos reposterías ficticias (**Casa Aurora**, artesanal, y **Molino Central**, industrial) con la misma página: solo cambia el tema. |
| `demo/src/themes/themes.json` | **El único lugar donde viven los colores.** Tokens en tres niveles. |
| `demo/src/antipattern/` | Cómo **no** se hace: colores resueltos con `if (tenant === ...)`. |
| `demo/src/components/broken/` | Errores intencionales para la demo (hex hardcodeado, pareja superficie/contenido rota). |
| `slides/index.html` | La presentación, autocontenida y construida con su propio sistema de tokens. |
| `guia/guia-presentador.md` | Notas por slide, reparto de tiempo y banco de preguntas. |

## Los tres niveles de tokens

| Nivel | Ejemplo | Quién lo usa |
|---|---|---|
| Primitivo (por valor) | `--rosa-300: #f2b6c4` | Solo el archivo de temas |
| Semántico (por rol) | `--accent: var(--rosa-300)` | Los componentes |
| De componente | `--btn-bg: var(--accent)` | Un componente que necesita desviarse del rol |

## Tu primer tema en menos de diez minutos

1. Copia uno de los temas de `demo/src/themes/themes.json` con un nombre nuevo.
2. Cambia los **primitivos** por tu paleta.
3. Revisa que cada pareja de roles siga legible: `surface` / `on-surface`, `accent` / `on-accent`.
4. Agrega su id a `TENANT_IDS` en `demo/src/App.jsx` y sus textos en `demo/src/content/tenants.js`.

## Alcance honesto

Este repo demuestra **la capa de identidad visual** de un sistema multitenant. No implementa resolución de tenant ni aislamiento de datos; la guía explica sus trade-offs.
