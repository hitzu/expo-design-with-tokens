import { resolveRawValue } from '../themes/applyTheme.js';
import TokenJsonView from './TokenJsonView.jsx';

/*
 * Demo 2 · Editor de tokens en vivo.
 * Edita el nivel semántico del tenant activo. Cada cambio vuelve a escribir
 * las variables CSS: la página se repinta al instante, sin recargar.
 */
const FAMILY_LABELS = {
  surfaces: 'Superficies',
  content: 'Contenido',
  accent: 'Acento',
  borders: 'Bordes',
  states: 'Estados',
  illustration: 'Ilustración',
  typography: 'Tipografía',
  shape: 'Forma',
  spacing: 'Espaciado',
  elevation: 'Elevación',
};

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

function TokenRow({ name, value, theme, onChange }) {
  const rawValue = resolveRawValue(value, theme);
  const isColor = HEX_COLOR.test(rawValue);
  const isReference = rawValue !== value;
  const inputId = `token-${name}`;

  return (
    <div className="cp-token">
      <label className="cp-token__name" htmlFor={inputId}>
        --{name}
      </label>
      <div className="cp-token__inputs">
        {isColor && (
          <input
            type="color"
            className="cp-token__swatch"
            aria-label={`Color de --${name}`}
            value={rawValue.toLowerCase()}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
        <input
          id={inputId}
          type="text"
          className="cp-input cp-token__text"
          value={value}
          spellCheck={false}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {isReference && <span className="cp-token__resolved">→ {rawValue}</span>}
    </div>
  );
}

export default function TokenEditor({ theme, onSemanticChange, onReset }) {
  const semantic = theme.semantic;
  const families = Object.entries(semantic).filter(
    ([key, tokens]) => !key.startsWith('_') && typeof tokens === 'object',
  );

  function updateToken(family, name, value) {
    onSemanticChange({
      ...semantic,
      [family]: { ...semantic[family], [name]: value },
    });
  }

  return (
    <div className="cp-editor">
      <div className="cp-editor__toolbar">
        <p className="cp-hint">Nivel semántico del tenant activo.</p>
        <button type="button" className="cp-button" onClick={onReset}>
          Restablecer
        </button>
      </div>

      {families.map(([family, tokens]) => (
        <fieldset key={family} className="cp-family">
          <legend>{FAMILY_LABELS[family] ?? family}</legend>
          {Object.entries(tokens).map(([name, value]) => (
            <TokenRow
              key={name}
              name={name}
              value={value}
              theme={theme}
              onChange={(nextValue) => updateToken(family, name, nextValue)}
            />
          ))}
        </fieldset>
      ))}

      <TokenJsonView semantic={semantic} onSemanticChange={onSemanticChange} />
    </div>
  );
}
