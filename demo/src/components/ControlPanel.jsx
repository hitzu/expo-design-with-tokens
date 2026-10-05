import TenantSwitcher from './TenantSwitcher.jsx';
import TokenEditor from './TokenEditor.jsx';

/*
 * Panel de la charla. Vive FUERA del sistema de temas a propósito
 * (ver styles/control-panel.css): tiene que leerse igual en cualquier tenant,
 * incluso cuando rompemos los tokens en vivo.
 */
const DEMO_TOGGLES = [
  { key: 'antipattern', label: 'Demo 3 · Antipatrón: un if por tenant' },
  { key: 'hardcodedHex', label: 'Demo 4 · Hex hardcodeado' },
  { key: 'surfacePair', label: 'Demo 5 · Par surface / on-surface' },
];

export default function ControlPanel({
  open,
  onOpenChange,
  tenantIds,
  tenantNames,
  tenantId,
  onTenantChange,
  demos,
  onToggleDemo,
  theme,
  onSemanticChange,
  onReset,
}) {
  if (!open) {
    return (
      <button type="button" className="cp-reopen" onClick={() => onOpenChange(true)}>
        Panel de demo
      </button>
    );
  }

  return (
    <aside className="control-panel" aria-label="Panel de demo">
      <header className="cp-header">
        <div>
          <p className="cp-title">Panel de demo</p>
          <p className="cp-hint">Fuera del sistema de temas · tecla «t» cambia tenant</p>
        </div>
        <button type="button" className="cp-button" onClick={() => onOpenChange(false)}>
          Ocultar
        </button>
      </header>

      <section className="cp-section">
        <h2 className="cp-section__title">Demo 1 · Tenant</h2>
        <TenantSwitcher
          tenantIds={tenantIds}
          tenantNames={tenantNames}
          tenantId={tenantId}
          onChange={onTenantChange}
        />
      </section>

      <section className="cp-section">
        <h2 className="cp-section__title">Demos de errores</h2>
        {DEMO_TOGGLES.map(({ key, label }) => (
          <label key={key} className="cp-checkbox">
            <input type="checkbox" checked={demos[key]} onChange={() => onToggleDemo(key)} />
            <span>{label}</span>
          </label>
        ))}
      </section>

      <section className="cp-section">
        <h2 className="cp-section__title">Demo 2 · Editor de tokens</h2>
        <TokenEditor theme={theme} onSemanticChange={onSemanticChange} onReset={onReset} />
      </section>
    </aside>
  );
}
