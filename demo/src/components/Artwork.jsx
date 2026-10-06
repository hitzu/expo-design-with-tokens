/*
 * Ilustración abstracta en SVG, sin imágenes externas.
 * Los rellenos leen --art-bg, --art-1, --art-2 y --art-3:
 * en Casa Aurora parecen pasteles; en Molino Central, piezas de una línea de producción.
 */
const fill = (token) => ({ fill: `var(--${token})` });
const stroke = (token) => ({ stroke: `var(--${token})` });

function Circles() {
  return (
    <>
      <circle cx="120" cy="112" r="72" style={fill('art-1')} />
      <circle cx="214" cy="84" r="46" style={fill('art-2')} />
      <circle cx="248" cy="150" r="24" style={fill('art-3')} />
    </>
  );
}

function Stack() {
  return (
    <>
      <ellipse cx="160" cy="146" rx="96" ry="26" style={fill('art-2')} />
      <ellipse cx="160" cy="106" rx="80" ry="24" style={fill('art-1')} />
      <ellipse cx="160" cy="68" rx="62" ry="20" style={fill('art-3')} />
    </>
  );
}

function Waves() {
  const wave = { fill: 'none', strokeWidth: 14, strokeLinecap: 'round' };
  return (
    <>
      <path d="M20 70 Q 80 20 140 70 T 260 70 T 380 70" style={{ ...wave, ...stroke('art-1') }} />
      <path d="M-20 110 Q 40 60 100 110 T 220 110 T 340 110" style={{ ...wave, ...stroke('art-2') }} />
      <path d="M20 150 Q 80 100 140 150 T 260 150 T 380 150" style={{ ...wave, ...stroke('art-3') }} />
    </>
  );
}

const SHAPES = [Circles, Stack, Waves];

export default function Artwork({ variant = 0, label }) {
  const Shape = SHAPES[variant % SHAPES.length];

  return (
    <svg className="artwork" viewBox="0 0 320 200" role="img" aria-label={label}>
      <rect width="320" height="200" style={fill('art-bg')} />
      <Shape />
    </svg>
  );
}
