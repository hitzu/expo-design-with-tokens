/*
 * 🐞 BUG INTENCIONAL · Demo 5
 *
 * Esta tarjeta SÍ usa tokens… pero mezcla parejas:
 *   fondo  → var(--surface-elevated)   (familia surface)
 *   texto  → var(--on-accent)          (familia accent)
 *
 * En Casa Aurora on-accent es cacao oscuro y por casualidad se lee bien.
 * En Nocturne on-accent es casi negro (pensado para ir sobre el neón)
 * y queda texto oscuro sobre superficie oscura: ilegible.
 *
 * Regla: cada surface-* va con on-surface. Fondo y texto se eligen en pareja.
 */
export default function WrongPairCard({ children }) {
  return (
    <div
      className="pair-card"
      style={{
        background: 'var(--surface-elevated)',
        color: 'var(--on-accent)', // ← el par equivocado
      }}
    >
      {children}
    </div>
  );
}
