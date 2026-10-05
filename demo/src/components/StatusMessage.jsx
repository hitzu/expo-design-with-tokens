/*
 * Mensaje de estado. El tono elige el token: --success, --error o --warning.
 * El texto siempre usa --on-surface para mantener el contraste.
 */
const ICONS = { success: '✓', error: '✕', warning: '!' };
const TITLES = { success: 'Listo', error: 'Error', warning: 'Atención' };

export default function StatusMessage({ tone = 'success', children }) {
  return (
    <div className={`status status--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="status__icon" aria-hidden="true">
        {ICONS[tone]}
      </span>
      <p>
        <strong>{TITLES[tone]}.</strong> {children}
      </p>
    </div>
  );
}
