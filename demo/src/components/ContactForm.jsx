import { useState } from 'react';
import Button from './Button.jsx';
import StatusMessage from './StatusMessage.jsx';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ content, states }) {
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    setResult(EMAIL_PATTERN.test(String(email)) ? 'success' : 'error');
  }

  return (
    <section className="section contact" aria-labelledby="contact-title">
      <form className="card contact__form" onSubmit={handleSubmit} noValidate>
        <h2 id="contact-title">{content.title}</h2>
        <p className="muted">{content.text}</p>

        <label className="field">
          <span>Nombre</span>
          <input name="name" type="text" placeholder={content.namePlaceholder} />
        </label>

        <label className="field">
          <span>Correo</span>
          <input name="email" type="email" placeholder={content.emailPlaceholder} />
        </label>

        <label className="field">
          <span>Mensaje</span>
          <textarea name="message" rows={3} placeholder={content.messagePlaceholder} />
        </label>

        <div className="button-row">
          <Button type="submit" variant="primary">
            {content.submit}
          </Button>
          <Button type="reset" variant="secondary" onClick={() => setResult(null)}>
            Limpiar
          </Button>
        </div>

        {result && <StatusMessage tone={result}>{states[result]}</StatusMessage>}
      </form>

      <aside className="contact__states" aria-label={content.statesTitle}>
        <h3>{content.statesTitle}</h3>
        <StatusMessage tone="success">{states.success}</StatusMessage>
        <StatusMessage tone="warning">{states.warning}</StatusMessage>
        <StatusMessage tone="error">{states.error}</StatusMessage>
      </aside>
    </section>
  );
}
