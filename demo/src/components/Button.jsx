/*
 * Botón del sistema.
 * No recibe "tenant" ni colores: su CSS lee --btn-bg, --btn-fg y --btn-radius.
 * El mismo botón sirve para cualquier cliente, presente o futuro.
 */
export default function Button({ variant = 'primary', type = 'button', children, ...props }) {
  return (
    <button type={type} className={`btn btn--${variant}`} {...props}>
      {children}
    </button>
  );
}
