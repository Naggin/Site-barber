import { InkMarks, InkSignature } from './InkSignature.jsx';

export function Hero() {
  return (
    <section className="hero container" id="inicio" aria-labelledby="hero-title">
      <InkSignature className="hero__signature hero__signature--desktop" />
      <div className="hero__heading">
        <p className="hero__eyebrow">BARBEIRO PARA O SEU EVENTO</p>
        <h1 className="hero__title" id="hero-title">JEAN KREUZ.</h1>
      </div>
      <div className="hero__media">
        <img
          className="hero__image"
          src="/images/hero-1920.webp"
          srcSet="/images/hero-960.webp 960w, /images/hero-1920.webp 1920w"
          sizes="(max-width: 700px) min(74vw, 300px), (max-width: 1050px) 44vw, 480px"
          width="1920"
          height="2880"
          alt="Jean Kreuz usa o secador para finalizar o cabelo de um cliente sorrindo."
          fetchPriority="high"
        />
        <InkMarks className="hero__marks" />
      </div>
      <div className="hero__copy">
        <p className="hero__description">
          Mais de 10 anos de experiência e um atendimento que valoriza o seu estilo.
        </p>
        <p className="hero__description hero__description--secondary">
          Com a Kreuz Barber, Jean leva o atendimento personalizado a casamentos,
          eventos e aniversários. No local do seu evento, com disponibilidade para atender em qualquer lugar.
        </p>
        <InkSignature className="hero__signature hero__signature--mobile" compact />
      </div>
    </section>
  );
}
