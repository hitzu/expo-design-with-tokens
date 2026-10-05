import DemoSection, { Comparison } from './DemoSection.jsx';
import WrongPairCard from '../components/broken/WrongPairCard.jsx';

function PairContent() {
  return (
    <>
      <h3>Reserva confirmada</h3>
      <p>Tu mesa queda guardada hasta 15 minutos después de la hora indicada.</p>
    </>
  );
}

export default function SurfacePairDemo() {
  return (
    <DemoSection
      number={5}
      title="Par surface / on-surface"
      caption="Las dos tarjetas usan tokens. La izquierda combina surface-elevated con on-accent: en Casa Aurora pasa desapercibido, en Nocturne el texto desaparece. La derecha usa la pareja correcta: surface-elevated con on-surface."
    >
      <div className="comparison-grid">
        <Comparison verdict="wrong" label="surface-elevated + on-accent">
          <WrongPairCard>
            <PairContent />
          </WrongPairCard>
        </Comparison>
        <Comparison verdict="right" label="surface-elevated + on-surface">
          <div className="pair-card pair-card--correct">
            <PairContent />
          </div>
        </Comparison>
      </div>
    </DemoSection>
  );
}
