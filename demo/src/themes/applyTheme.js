/*
 * applyTheme.js
 *
 * Convierte un tema de themes.json en variables CSS sobre :root.
 *
 * Los tres niveles se escriben así:
 *
 *   1. Primitivos   → valor crudo          --rosa-300: #f2b6c4;
 *   2. Semánticos   → var() a un primitivo  --accent:   var(--rosa-300);
 *   3. Componentes  → var() a un semántico  --btn-bg:   var(--accent);
 *
 * Como cada nivel apunta al anterior con var(), cambiar UNA variable
 * se propaga en cascada: si editas --accent, --btn-bg cambia solo.
 */

// Una referencia es un texto con la forma "{nombre-del-token}".
const REFERENCE_PATTERN = /^\{([\w-]+)\}$/;

// Claves de documentación dentro del JSON: no son tokens.
function isDocumentationKey(key) {
  return key.startsWith('_') || key.startsWith('$');
}

// "{rosa-300}" → "var(--rosa-300)". Cualquier otro valor pasa tal cual.
export function toCssValue(value) {
  const text = String(value).trim();
  const match = REFERENCE_PATTERN.exec(text);
  return match ? `var(--${match[1]})` : text;
}

// Aplana un nivel: { surfaces: { surface: "…" } } → { surface: "…" }.
// Las familias (surfaces, content, accent…) ordenan el JSON, no el CSS.
export function flattenTokens(tier = {}) {
  const flat = {};

  for (const [key, value] of Object.entries(tier)) {
    if (isDocumentationKey(key)) continue;

    if (value !== null && typeof value === 'object') {
      Object.assign(flat, flattenTokens(value));
    } else {
      flat[key] = value;
    }
  }

  return flat;
}

// Devuelve todas las variables CSS del tema, en orden: primitivos, semánticos, componentes.
export function buildCssVariables(theme) {
  const variables = {};

  for (const tierName of ['primitives', 'semantic', 'component']) {
    const tokens = flattenTokens(theme[tierName]);

    for (const [name, value] of Object.entries(tokens)) {
      variables[`--${name}`] = toCssValue(value);
    }
  }

  return variables;
}

// Recordamos qué variables escribimos para borrarlas al cambiar de tenant
// (cada tenant tiene primitivos con nombres distintos).
let previouslyAppliedNames = [];

export function applyTheme(themeId, theme, root = document.documentElement) {
  for (const name of previouslyAppliedNames) {
    root.style.removeProperty(name);
  }

  const variables = buildCssVariables(theme);

  for (const [name, value] of Object.entries(variables)) {
    root.style.setProperty(name, value);
  }

  previouslyAppliedNames = Object.keys(variables);
  root.dataset.theme = themeId;
}

// Sigue las referencias hasta llegar al valor crudo. Lo usa el editor
// para mostrar el color real en el <input type="color">.
export function resolveRawValue(value, theme, depth = 0) {
  const match = REFERENCE_PATTERN.exec(String(value).trim());
  if (!match || depth > 10) return String(value);

  const allTokens = {
    ...flattenTokens(theme.primitives),
    ...flattenTokens(theme.semantic),
    ...flattenTokens(theme.component),
  };
  const target = allTokens[match[1]];

  return target === undefined ? String(value) : resolveRawValue(target, theme, depth + 1);
}
