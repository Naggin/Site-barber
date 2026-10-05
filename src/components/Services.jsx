import { InkMarks } from './InkSignature.jsx';

export function Services({ services }) {
  return (
    <section className="services" id="atendimentos" aria-labelledby="services-title">
      <div className="container">
        <div className="services__intro" data-reveal>
          <div>
            <p className="section-label">ATENDIMENTOS</p>
            <h2 className="section-heading" id="services-title">BARBEARIA NO<br />SEU EVENTO.</h2>
          </div>
          <p className="section-copy">
            Atendimento personalizado para casamentos, eventos e aniversários.
            Jean vai até o seu evento, com disponibilidade para viajar.
          </p>
        </div>
        <div className="services__grid">
          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.number}
              data-reveal
              data-reveal-delay={index % 3}
            >
              <header className="service-card__header">
                <span className="service-card__number" aria-hidden="true">{service.number}</span>
                <InkMarks className="service-card__marks" />
              </header>
              <div className="service-card__copy">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
