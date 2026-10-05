import { WhatsAppLink } from './WhatsAppLink.jsx';

export function Contact({ contact }) {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="contact__inner container">
        <div className="contact__copy">
          <p className="section-label">VAMOS CONVERSAR</p>
          <h2 className="section-heading" id="contact-title">SEU PRÓXIMO<br />MOMENTO COMEÇA AQUI.</h2>
          <p className="section-copy">
            Me conta onde, quando e como você imagina o seu evento.
            Vamos combinar os detalhes do seu atendimento.
          </p>
        </div>
        <div className="contact__actions">
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
          <p className="contact__availability">ATENDIMENTO NO LOCAL DO SEU EVENTO.</p>
        </div>
      </div>
    </section>
  );
}
