import React from 'react';

const ComoFunciona = () => {
  return (
    <section id="como-funciona" className="landing-section">
      <h3 className="section-title">¿Cómo funciona?</h3>
      <p className="section-text">
        Confiapro te conecta fácilmente con profesionales de confianza en tu zona. Sigue estos pasos:
      </p>
      <ol className="landing-steps">
        <li><strong>Regístrate:</strong> Crea tu cuenta como cliente o profesional.</li>
        <li><strong>Completa tu perfil:</strong> Agrega tus datos y preferencias.</li>
        <li><strong>Explora servicios:</strong> Filtra por categoría, valoración o ubicación.</li>
        <li><strong>Contrata con confianza:</strong> Revisa opiniones y elige con seguridad.</li>
        <li><strong>Valora el servicio:</strong> Comparte tu experiencia para ayudar a otros.</li>
      </ol>
    </section>
  );
};

export default ComoFunciona;
