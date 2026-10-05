import { WhatsAppLink } from './WhatsAppLink.jsx';

export function Hero({ contact }) {
  return (
    <section className="hero container" id="inicio" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__eyebrow">BARBEIRO PARA O SEU EVENTO</p>
        <h1 className="hero__title" id="hero-title">
          <span>SEU MOMENTO.</span>
          <span>SEU ESTILO.</span>
        </h1>
        <p className="hero__description">
          Atendimento personalizado para casamentos, eventos e aniversários.
          Com o cuidado e a presença de Jean Kreuz.
        </p>
        <WhatsAppLink contact={contact} className="button button--dark hero__cta">
          <span className="hero__cta-copy">
            <span className="hero__cta-label">Solicitar orçamento</span>
            <span className="hero__cta-channel">Pelo WhatsApp</span>
          </span>
          <span className="hero__cta-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" focusable="false">
              <path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </WhatsAppLink>
        <p className="hero__note">MAIS DE 10 ANOS DE EXPERIÊNCIA. DISPONIBILIDADE PARA VIAJAR.</p>
      </div>
      <div className="hero__media">
        <img
          className="hero__image"
          src="/images/hero-1920.webp"
          srcSet="/images/hero-960.webp 960w, /images/hero-1920.webp 1920w"
          sizes="(max-width: 700px) calc(100vw - 40px), (min-width: 1376px) 717px, 56vw"
          width="1920"
          height="2880"
          alt="Jean Kreuz usa o secador para finalizar o cabelo de um cliente sorrindo."
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
