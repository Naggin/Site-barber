import { useEffect, useRef, useState } from 'react';
import { Brand } from './Brand.jsx';

export function Header({ navigation, brand }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Brand name={brand.name} onClick={() => setMenuOpen(false)} />
        <button
          className="menu-toggle"
          type="button"
          ref={toggleRef}
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__label">{menuOpen ? 'FECHAR' : 'MENU'}</span>
          <span className="menu-toggle__icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <nav
          id="site-navigation"
          className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
