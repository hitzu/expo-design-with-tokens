# Temas: tres niveles de tokens

`themes.json` es el **único** archivo del proyecto donde viven los colores
(salvo los dos bugs intencionales de la demo, marcados como tales).

| Nivel | Clave en el JSON | Ejemplo | Responde a |
|-------|------------------|---------|------------|
| 1 · Primitivos | `primitives` | `"rosa-300": "#f2b6c4"` | ¿Qué es? |
| 2 · Semánticos | `semantic` | `"accent": "{rosa-300}"` | ¿Para qué sirve? |
| 3 · Componentes | `component` | `"btn-bg": "{accent}"` | ¿Dónde se usa? |

- Los **primitivos** son la paleta cruda de cada tenant. Ningún componente los lee.
- Los **semánticos** son el contrato: mismos nombres de rol en todos los tenants
  (`surface`, `on-surface`, `accent`, `on-accent`, `border`, `success`, `focus`…),
  agrupados por familia. También incluyen tipografía, forma, espaciado y elevación:
  un tema es más que una paleta.
- Los **de componente** son opcionales y siempre apuntan a un semántico.

## Cómo llegan al CSS

`applyTheme.js` escribe variables CSS en `:root` y pone `data-theme` en `<html>`:

```css
--rosa-300: #f2b6c4;        /* primitivo: valor crudo   */
--accent:   var(--rosa-300); /* semántico: apunta al primitivo */
--btn-bg:   var(--accent);   /* componente: apunta al semántico */
```

Como cada nivel apunta al anterior, editar `--accent` repinta todo lo que
depende de él, incluido `--btn-bg`, sin recargar.

## Regla de pares

Cada superficie va con su contenido: `surface-*` con `on-surface`,
`accent` con `on-accent`. Fondo y texto se eligen como pareja, nunca por separado.

## Añadir un tenant

Copia un tema, cambia los `primitives` y reapunta los `semantic`.
No hay que tocar ningún componente.
