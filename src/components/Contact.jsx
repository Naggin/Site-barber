import { WhatsAppLink } from './WhatsAppLink.jsx';

export function Contact({ contact }) {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="contact__inner container">
        <div className="contact__copy" data-reveal>
          <p className="section-label">VAMOS CONVERSAR</p>
          <h2 className="section-heading" id="contact-title">SEU EVENTO,<br />DO SEU JEITO.</h2>
          <p className="section-copy">
            Conte a data e o local do evento. Jean prepara um orçamento
            personalizado para você.
          </p>
        </div>
        <div className="contact__actions" data-reveal data-reveal-delay="1">
          <WhatsAppLink contact={contact} className="button button--light">
            Solicitar orçamento <span aria-hidden="true">↗</span>
          </WhatsAppLink>
          <WhatsAppLink
            contact={contact}
            className="contact__phone"
            aria-label={`Conversar com Jean pelo WhatsApp: ${contact.phoneDisplay} (abre em uma nova aba)`}
          >
            {contact.phoneDisplay}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
