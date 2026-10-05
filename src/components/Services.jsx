export function Services({ services }) {
  return (
    <section className="services" id="atendimentos" aria-labelledby="services-title">
      <div className="container">
        <div className="services__intro" data-reveal>
          <div>
            <p className="section-label">DO SEU JEITO</p>
            <h2 className="section-heading" id="services-title">O EVENTO É SEU.<br />O CUIDADO TAMBÉM.</h2>
          </div>
        <p className="section-copy">
          Atendimento no local do evento, com disponibilidade para viajar.
          Conte a sua ideia e converse com Jean sobre o pacote para a ocasião.
        </p>
      </div>
      <div className="services__list">
        {services.map((service) => (
          <article className="service-row" key={service.number} data-reveal>
            <span className="service-row__number" aria-hidden="true">{service.number}</span>
            <h3 className="service-row__title">{service.title}</h3>
            <p className="service-row__description">{service.description}</p>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
