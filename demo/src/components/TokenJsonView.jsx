import { useEffect, useRef, useState } from 'react';

/*
 * Vista JSON editable del nivel semántico.
 * Si el texto es JSON válido, se aplica al instante; si no, se avisa y no se toca nada.
 */
export default function TokenJsonView({ semantic, onSemanticChange }) {
  const serialized = JSON.stringify(semantic, null, 2);
  const [draft, setDraft] = useState(serialized);
  const [isValid, setIsValid] = useState(true);
  const textareaRef = useRef(null);

  // Si el cambio llega desde fuera (otro tenant, el editor, "Restablecer"),
  // sincronizamos el texto. Mientras escribes aquí, respetamos tu borrador.
  useEffect(() => {
    if (document.activeElement !== textareaRef.current) {
      setDraft(serialized);
      setIsValid(true);
    }
  }, [serialized]);

  function handleChange(event) {
    const text = event.target.value;
    setDraft(text);

    try {
      const parsed = JSON.parse(text);
      const isObject = parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);
      setIsValid(isObject);
      if (isObject) onSemanticChange(parsed);
    } catch {
      setIsValid(false);
    }
  }

  return (
    <details className="cp-json">
      <summary>Ver JSON del nivel semántico</summary>
      <textarea
        ref={textareaRef}
        className="cp-input cp-json__textarea"
        value={draft}
        spellCheck={false}
        aria-label="JSON del nivel semántico"
        aria-invalid={!isValid}
        onChange={handleChange}
        onBlur={() => {
          setDraft(serialized);
          setIsValid(true);
        }}
      />
      <p className={`cp-json__status ${isValid ? '' : 'cp-json__status--invalid'}`}>
        {isValid ? 'JSON válido · aplicado en vivo' : 'JSON inválido · no se aplicó'}
      </p>
    </details>
  );
}
