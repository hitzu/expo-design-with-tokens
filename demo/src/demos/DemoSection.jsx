/*
 * Marco de una sección didáctica. La etiqueta y el pie usan estilos neutros
 * (control-panel.css) para leerse igual en cualquier tenant; el contenido
 * de .teaching__stage sí hereda el tema activo.
 */
export default function DemoSection({ number, title, caption, children }) {
  const headingId = `demo-${number}-title`;

  return (
    <section className="teaching" aria-labelledby={headingId}>
      <header className="teaching__label">
        <span className="teaching__number">Demo {number}</span>
        <h2 id={headingId}>{title}</h2>
      </header>
      <div className="teaching__stage">{children}</div>
      <p className="teaching__caption">{caption}</p>
    </section>
  );
}

// Columna comparativa con un sello neutro "Incorrecto" / "Correcto".
export function Comparison({ verdict, label, children }) {
  return (
    <div className="comparison">
      <p className={`verdict verdict--${verdict}`}>
        {verdict === 'wrong' ? '✕ Incorrecto' : '✓ Correcto'} · {label}
      </p>
      <div className="comparison__body">{children}</div>
    </div>
  );
}
