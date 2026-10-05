export function WhatsAppLink({ contact, className = '', children = 'Solicitar orçamento', ...props }) {
  return (
    <a
      href={contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Solicitar orçamento pelo WhatsApp (abre em uma nova aba)"
      {...props}
    >
      {children}
    </a>
  );
}
