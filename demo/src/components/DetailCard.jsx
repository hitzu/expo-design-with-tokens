import Artwork from './Artwork.jsx';
import Button from './Button.jsx';

export default function DetailCard({ content }) {
  return (
    <section className="section" aria-labelledby="detail-title">
      <article className="card detail-card">
        <div className="detail-card__media">
          <Artwork variant={2} label={content.title} />
        </div>

        <div className="detail-card__body">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="detail-title">{content.title}</h2>
          <p>{content.text}</p>

          <dl className="facts">
            {content.facts.map(([label, value]) => (
              <div key={label} className="facts__item">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="button-row">
            <Button variant="primary">{content.primary}</Button>
            <Button variant="secondary">{content.secondary}</Button>
          </div>
        </div>
      </article>
    </section>
  );
}
