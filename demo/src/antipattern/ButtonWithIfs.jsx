/*
 * ❌ CÓMO NO SE HACE
 *
 * Este botón conoce a todos los clientes. Cada tenant es una rama "if"
 * con colores literales escritos dentro del componente.
 *
 * Hoy funciona: con dos clientes se ve bien. Pero:
 *   - Llega el cliente 12 → hay que abrir ESTE archivo y añadir otra rama.
 *   - Y la tarjeta, el input, el badge, el header… cada componente repite estos ifs.
 *   - 12 clientes × 40 componentes = 480 lugares donde puede faltar una rama.
 *   - Si un cliente cambia su rosa, hay que buscarlo en todo el código.
 *
 * El color vive en el componente → no hay temas, hay copias.
 * Compáralo con components/Button.jsx: no sabe qué tenant está activo.
 */
export default function ButtonWithIfs({ tenant, children }) {
  let background;
  let color;
  let borderRadius;
  let fontFamily;
  let textTransform;

  if (tenant === 'aurora') {
    background = '#f2b6c4';
    color = '#3a2419';
    borderRadius = '28px';
    fontFamily = 'Georgia, serif';
    textTransform = 'none';
  } else if (tenant === 'nocturne') {
    background = '#ff2bd6';
    color = '#07060d';
    borderRadius = '0px';
    fontFamily = '"Arial Narrow", sans-serif';
    textTransform = 'uppercase';
  } else {
    // ¿Cliente 12? Nadie se acordó de este archivo: cae en un "default" que nadie diseñó.
    background = '#cccccc';
    color = '#555555';
    borderRadius = '3px';
    fontFamily = 'Arial, sans-serif';
    textTransform = 'none';
  }

  return (
    <button
      type="button"
      style={{
        background,
        color,
        borderRadius,
        fontFamily,
        textTransform,
        border: 'none',
        padding: '14px 26px',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
