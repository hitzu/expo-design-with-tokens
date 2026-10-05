import Logo from './Logo.jsx';
import Button from './Button.jsx';
import Artwork from './Artwork.jsx';

export default function Header({ content }) {
  const { brand, nav, hero } = content;

  return (
    <header className="site-header" id="top">
      <div className="site-header__bar">
        <Logo brand={brand} />
        <nav aria-label="Principal">
          <ul className="site-nav">
            {nav.map((label) => (
              <li key={label}>
                <a href="#top">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">{hero.title}</h1>
          <p className="hero__text">{hero.text}</p>
          <div className="button-row">
            <Button variant="primary">{hero.primary}</Button>
            <Button variant="secondary">{hero.secondary}</Button>
          </div>
        </div>
        <div className="hero__art">
          <Artwork variant={0} label={hero.title} />
        </div>
      </section>
    </header>
  );
}
