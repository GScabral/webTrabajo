import React from 'react';

const Servicios = () => {
  return (
    <section id="servicios" className="landing-section colored">
      <h3 className="section-title">Servicios Populares</h3>
      <p className="section-text">Estos son algunos de los profesionales más solicitados:</p>
      <ul className="servicios-grid">
        <li>🔧 Fontaneros</li>
        <li>💻 Desarrolladores web</li>
        <li>🧒 Niñeras</li>
        <li>🌿 Jardineros</li>
        <li>🧹 Personal de limpieza</li>
        <li>🔌 Electricistas</li>
      </ul>
      <p className="servicios-note">Todos nuestros profesionales han sido verificados y cuentan con valoraciones reales.</p>
    </section>
  );
};

export default Servicios;
