import React from 'react';

const Contacto = () => {
  return (
    <section id="contacto" className="landing-section">
      <h3 className="section-title">Contacto</h3>
      <p className="section-text">¿Tienes dudas o necesitas ayuda? Estamos aquí para ti.</p>
      <p className="section-text">✉️ Escríbenos a: <a href="mailto:soporte@confiapro.com" className="contact-link">soporte@confiapro.com</a></p>
      <p className="section-text">📷 Síguenos en Instagram: <a href="https://instagram.com/confiapro" target="_blank" rel="noopener noreferrer" className="contact-link">@confiapro</a></p>
    </section>
  );
};

export default Contacto;
