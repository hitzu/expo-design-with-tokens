/*
 * Demo 1 · Cambio de tenant.
 * Cambiar de tenant = cambiar qué tema se escribe en :root. Ningún componente se entera.
 */
export default function TenantSwitcher({ tenantIds, tenantNames, tenantId, onChange }) {
  return (
    <div className="cp-segmented" role="radiogroup" aria-label="Tenant activo">
      {tenantIds.map((id) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={id === tenantId}
          className="cp-segmented__option"
          onClick={() => onChange(id)}
        >
          {tenantNames[id]}
        </button>
      ))}
    </div>
  );
}
