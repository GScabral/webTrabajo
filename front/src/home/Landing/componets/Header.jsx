import React from 'react';

const Header = () => {
  return (
    <header className="landing-header">
      <h1 className="landing-logo">ConfíaPRO</h1>
      <nav className="landing-nav">
        <a href="#como-funciona" className="landing-nav-link">Cómo funciona</a>
        <a href="#servicios" className="landing-nav-link">Servicios</a>
        <a href="#contacto" className="landing-nav-link">Contacto</a>
      </nav>
    </header>
  );
};

export default Header;
