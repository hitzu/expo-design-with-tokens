/*
 * 🐞 BUG INTENCIONAL · Demo 4
 *
 * Alguien copió los colores de Casa Aurora directamente del archivo de diseño.
 * En Aurora se ve perfecto. Cambia a Nocturne: sigue rosa pastel en medio
 * del club oscuro, porque un hex literal no participa del sistema de temas.
 *
 * Arreglo: usar roles, no valores → var(--surface-overlay), var(--on-surface), var(--accent).
 */
export default function HardcodedBadge({ children }) {
  return (
    <div
      className="promo"
      style={{
        background: '#fbe6ec', // rosa-100 de Aurora, escrito a mano
        color: '#7a5a48', // cacao-600 de Aurora, escrito a mano
        border: '1px solid #f2b6c4', // rosa-300 de Aurora, escrito a mano
        borderRadius: '18px',
      }}
    >
      {children}
    </div>
  );
}
