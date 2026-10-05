/*
 * Marca del tenant: monograma + nombre.
 * La forma (círculo o cuadrado) sale de --logo-radius; el color, de --accent.
 */
export default function Logo({ brand }) {
  return (
    <a className="logo" href="#top" aria-label={`${brand.name}, inicio`}>
      <span className="logo__mark" aria-hidden="true">
        {brand.monogram}
      </span>
      <span className="logo__text">
        <span className="logo__name">{brand.name}</span>
        <span className="logo__tagline">{brand.tagline}</span>
      </span>
    </a>
  );
}
