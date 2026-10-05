import Artwork from './Artwork.jsx';

export default function Gallery({ content }) {
  return (
    <section className="section" aria-labelledby="gallery-title">
      <h2 id="gallery-title">{content.title}</h2>

      <ul className="gallery">
        {content.items.map((item, index) => (
          <li key={item.title} className="card">
            <div className="card__media">
              <Artwork variant={index} label={item.title} />
            </div>
            <div className="card__body">
              <span className="tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="muted">{item.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
