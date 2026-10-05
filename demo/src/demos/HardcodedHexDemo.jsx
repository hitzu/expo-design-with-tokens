import DemoSection, { Comparison } from './DemoSection.jsx';
import HardcodedBadge from '../components/broken/HardcodedBadge.jsx';

export default function HardcodedHexDemo() {
  return (
    <DemoSection
      number={4}
      title="Hex hardcodeado"
      caption="Cambia de tenant: el banner de la izquierda se queda rosa pastel porque su color está escrito en el componente. El de la derecha usa roles y se adapta solo."
    >
      <div className="comparison-grid">
        <Comparison verdict="wrong" label="background: #fbe6ec">
          <HardcodedBadge>Promo de temporada · envío gratis este fin de semana</HardcodedBadge>
        </Comparison>
        <Comparison verdict="right" label="background: var(--surface-overlay)">
          <div className="promo promo--tokens">
            Promo de temporada · envío gratis este fin de semana
          </div>
        </Comparison>
      </div>
    </DemoSection>
  );
}
