import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Orden de estilos: base del documento → componentes del tenant → panel de la charla.
import './styles/base.css';
import './styles/components.css';
import './styles/control-panel.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
