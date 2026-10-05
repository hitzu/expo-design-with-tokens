import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import themes from './themes/themes.json';
import { applyTheme } from './themes/applyTheme.js';
import { tenantContent } from './content/tenants.js';

import Header from './components/Header.jsx';
import Gallery from './components/Gallery.jsx';
import DetailCard from './components/DetailCard.jsx';
import ContactForm from './components/ContactForm.jsx';
import ControlPanel from './components/ControlPanel.jsx';

import AntipatternDemo from './demos/AntipatternDemo.jsx';
import HardcodedHexDemo from './demos/HardcodedHexDemo.jsx';
import SurfacePairDemo from './demos/SurfacePairDemo.jsx';

const TENANT_IDS = ['aurora', 'nocturne'];

// Copia profunda del nivel semántico de cada tenant: es lo que edita el panel en vivo.
function cloneSemanticTiers() {
  return Object.fromEntries(
    TENANT_IDS.map((id) => [id, structuredClone(themes[id].semantic)]),
  );
}

export default function App() {
  const [tenantId, setTenantId] = useState('aurora');
  const [semanticByTenant, setSemanticByTenant] = useState(cloneSemanticTiers);
  const [panelOpen, setPanelOpen] = useState(true);
  const [demos, setDemos] = useState({
    antipattern: false,
    hardcodedHex: false,
    surfacePair: false,
  });

  // El tema activo = el tema original con el nivel semántico (posiblemente editado).
  const activeTheme = useMemo(
    () => ({ ...themes[tenantId], semantic: semanticByTenant[tenantId] }),
    [tenantId, semanticByTenant],
  );

  // Cada vez que cambia el tenant o un token, reescribimos las variables CSS.
  // useLayoutEffect: se aplica antes de pintar, sin parpadeo.
  useLayoutEffect(() => {
    applyTheme(tenantId, activeTheme);
  }, [tenantId, activeTheme]);

  // Atajo para la charla: tecla "t" alterna el tenant (fuera de campos de texto).
  useEffect(() => {
    function handleKeyDown(event) {
      const typing = event.target.closest?.('input, textarea, select');
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 't') {
        setTenantId((current) => (current === 'aurora' ? 'nocturne' : 'aurora'));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function updateSemanticTier(nextSemantic) {
    setSemanticByTenant((current) => ({ ...current, [tenantId]: nextSemantic }));
  }

  function resetSemanticTier() {
    updateSemanticTier(structuredClone(themes[tenantId].semantic));
  }

  function toggleDemo(name) {
    setDemos((current) => ({ ...current, [name]: !current[name] }));
  }

  const content = tenantContent[tenantId];

  return (
    <div className={`app-shell ${panelOpen ? 'app-shell--panel-open' : ''}`}>
      <main className="tenant-page">
        {demos.antipattern && <AntipatternDemo tenantId={tenantId} />}
        {demos.hardcodedHex && <HardcodedHexDemo />}
        {demos.surfacePair && <SurfacePairDemo />}

        <Header content={content} />
        <Gallery content={content.gallery} />
        <DetailCard content={content.detail} />
        <ContactForm content={content.contact} states={content.states} />

        <footer className="page-footer">
          <p>{content.footer}</p>
        </footer>
      </main>

      <ControlPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        tenantIds={TENANT_IDS}
        tenantNames={Object.fromEntries(
          TENANT_IDS.map((id) => [id, tenantContent[id].brand.name]),
        )}
        tenantId={tenantId}
        onTenantChange={setTenantId}
        demos={demos}
        onToggleDemo={toggleDemo}
        theme={activeTheme}
        onSemanticChange={updateSemanticTier}
        onReset={resetSemanticTier}
      />
    </div>
  );
}
