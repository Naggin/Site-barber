const message = 'Olá, Jean! Conheci a Kreuz Barber pelo site e gostaria de um orçamento para o meu evento.'

export const site = {
  brand: { name: 'KREUZ BARBER', person: 'Jean Kreuz' },
  navigation: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Atendimentos', href: '#atendimentos' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Contato', href: '#contato' },
  ],
  services: [
    {
      number: '01',
      title: 'Casamentos',
      description: 'Cuidado com o visual para fazer parte da preparação de um dia especial. Um atendimento pensado para o seu momento.',
    },
    {
      number: '02',
      title: 'Eventos',
      description: 'Uma experiência de barbearia no local do seu evento. A proposta é personalizada para a ocasião que você está planejando.',
    },
    {
      number: '03',
      title: 'Aniversários',
      description: 'Para celebrar com seu próprio estilo. Converse com Jean sobre o atendimento e o pacote para a sua comemoração.',
    },
  ],
  photos: [
    { src: '/images/detail-960.webp', alt: 'Detalhe da finalização do cabelo durante o atendimento.', width: 960, height: 1440 },
    { src: '/images/preparation-960.webp', alt: 'Jean trabalhando com escova no cabelo de um cliente.', width: 960, height: 1440 },
    { src: '/images/finish-960.webp', alt: 'Preparação do cliente com escova e secador.', width: 960, height: 1440 },
    { src: '/images/backstage-1440.webp', alt: 'Bastidores de um atendimento de Jean Kreuz.', width: 1440, height: 960 },
  ],
  contact: {
    phoneDisplay: '+55 (51) 99795-7060',
    whatsappNumber: '5551997957060',
    message,
    whatsappUrl: `https://wa.me/5551997957060?text=${encodeURIComponent(message)}`,
  },
}
