import { Brand } from './Brand.jsx';

export function Footer({ brand }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <Brand name={brand.name} />
        <p className="site-footer__credit">JEAN KREUZ · BARBEIRO PARA EVENTOS</p>
        <a className="site-footer__top" href="#inicio">Voltar ao início <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
