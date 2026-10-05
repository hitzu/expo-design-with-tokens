import { useState } from 'react';
import DemoSection, { Comparison } from './DemoSection.jsx';
import ButtonWithIfs from '../antipattern/ButtonWithIfs.jsx';
import Button from '../components/Button.jsx';

export default function AntipatternDemo({ tenantId }) {
  // Solo para la demo: simular que llega un cliente nuevo que nadie añadió a los ifs.
  const [simulateNewClient, setSimulateNewClient] = useState(false);
  const antipatternTenant = simulateNewClient ? 'cliente-12' : tenantId;

  return (
    <DemoSection
      number={3}
      title="Antipatrón · un if por tenant"
      caption="Los dos botones se ven iguales con dos clientes. La diferencia aparece con el cliente 12: el de la izquierda necesita otra rama en cada componente; el de la derecha solo necesita otro tema."
    >
      <div className="comparison-grid">
        <Comparison verdict="wrong" label="antipattern/ButtonWithIfs.jsx">
          <ButtonWithIfs tenant={antipatternTenant}>Reservar</ButtonWithIfs>
        </Comparison>
        <Comparison verdict="right" label="components/Button.jsx">
          <Button variant="primary">Reservar</Button>
        </Comparison>
      </div>

      <label className="teaching__toggle">
        <input
          type="checkbox"
          checked={simulateNewClient}
          onChange={(event) => setSimulateNewClient(event.target.checked)}
        />
        <span>Simular que llega el «Cliente 12» (solo afecta al botón con ifs)</span>
      </label>
    </DemoSection>
  );
}
