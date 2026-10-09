import { InkSignature } from './InkSignature.jsx';

export function About() {
  return (
    <section className="about container" id="sobre" aria-labelledby="about-title">
      <div className="about__media" data-reveal>
        <img
          className="about__image"
          src="/images/jean-960.webp"
          width="960"
          height="1440"
          alt="Jean Kreuz prepara o cabelo de um cliente durante o atendimento."
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="about__copy" data-reveal data-reveal-delay="1">
        <div className="about__intro">
          <p className="section-label">QUEM ESTÁ POR TRÁS</p>
          <h2 className="section-heading" id="about-title">JEAN KREUZ.</h2>
          <p className="about__statement">Mais de 10 anos de experiência.<br />Um atendimento que é sobre você.</p>
        </div>
        <p className="section-copy">
          Cada atendimento começa com uma conversa. Jean escuta, entende e cuida
          dos detalhes para valorizar o estilo de cada pessoa.
        </p>
        <p className="section-copy">
          Com a Kreuz Barber, ele leva o atendimento personalizado até o seu evento.
          Para se preparar, curtir a experiência e chegar ao seu momento com confiança.
        </p>
        <InkSignature className="about__signature" word="KREUZ BARBER" compact />
      </div>
    </section>
  );
}
