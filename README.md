# Kreuz Barber

Site em português para divulgar o atendimento personalizado de Jean Kreuz em casamentos, eventos e aniversários. Estrutura inicial em React e Vite, com orçamento direto pelo WhatsApp.

## Desenvolvimento

Requisito: Node.js 22.12 ou superior. O ambiente foi validado com Node.js 24.19 e npm 11.9.

Abra um terminal na pasta do projeto (na nuvem: `/workspace/kreuz-barber`; no computador: a pasta extraída do projeto) e execute:

```bash
npm ci
npm run dev
```

Não é necessário banco de dados, backend, chave de API ou arquivo `.env` para este site.

## Verificações

```bash
npm run lint
npm run build
npm run preview
```

O build fica em `dist/`. Confira a abertura, o menu no celular, a navegação entre seções, o carregamento das fotos e os links de orçamento. O WhatsApp deve apontar para `5551997957060`, com a mensagem definida em `src/data/site.js`. Os testes locais não enviam mensagens.

A galeria tem movimento horizontal lento e botão de pausa. Confira a pausa ao passar o mouse, tocar ou navegar pelo teclado, além da apresentação estática com movimento reduzido. O movimento para fora da tela e com a aba oculta. Os três blocos de atendimentos e o contato devem caber em telas de 320px sem rolagem horizontal na página.

## Visualizar sem instalar ferramentas

Depois de extrair o ZIP do projeto, abra **`ABRIR-KREUZ-BARBER.html`**, na pasta principal, no Chrome ou Edge. A mesma prévia fica em `preview/kreuz-barber.html`. Ela inclui o conteúdo já renderizado, imagens, fontes, estilos e código no próprio HTML; a página aparece mesmo sem JavaScript. O WhatsApp precisa de conexão quando você clicar no link de orçamento.

O `index.html` da pasta principal é a entrada de desenvolvimento do Vite e precisa do servidor iniciado com `npm run dev`. Para visualizar com duplo clique, use `ABRIR-KREUZ-BARBER.html`.

A prévia representa a versão em que foi gerada. Depois de alterar o site, atualize-a com:

```bash
npm run preview:export
```

## Organização

- `src/components/`: cabeçalho, marca, abertura, galeria, apresentação, atendimentos, contato e rodapé.
- `src/data/site.js`: navegação, serviços, fotos e contato.
- `src/styles/global.css`: visual em preto e branco, fontes e adaptação ao celular.
- `public/images/`: cópias WebP das fotos fornecidas; `manifest.json` registra as origens.
- `public/fonts/`: fontes locais com suas licenças OFL.
- `docs/briefing.md`: decisões de identidade e conteúdo alinhadas com o usuário.

As fotografias originais permanecem intactas nos anexos do ambiente. Apenas as cópias utilizadas pelo site foram otimizadas. As fontes são hospedadas junto do site, sem depender de um serviço externo em tempo de execução.

## Projeto anterior e repositório

A pasta do projeto é `kreuz-barber`. O histórico Git e a licença foram preservados. Uma cópia completa e verificada do projeto anterior está fora do checkout, em `/workspace/shared/backups/`; `kreuz-backup-path.txt` informa o arquivo correspondente. Não publique esse backup, pois ele preserva também configurações locais antigas.

A renomeação no GitHub para `kreuz-barber` permanece pendente de acesso à API do GitHub pelo ambiente. O remoto atual é `Naggin/debt-manager`; não foi substituído por uma URL de repositório inexistente.
