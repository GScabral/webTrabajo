import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="landing-hero">
      <h2 className="hero-title">Encuentra profesionales de confianza cerca de ti</h2>
      <p className="hero-subtitle">Electricistas, jardineros, diseñadores, programadores y mucho más.</p>
      <div className="hero-buttons">
        <Link to="/register" className="hero-btn">Regístrate</Link>
        <Link to="/login" className="hero-btn secondary">Iniciar sesión</Link>
      </div>
    </section>
  );
};

export default HeroSection;
