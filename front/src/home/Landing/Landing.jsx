import React from 'react';
import './Landing.css';
import Header from './componets/Header';
import HeroSection from './componets/HeroSection';
import ComoFunciona from './componets/ComoFuncuina';
import Servicios from './componets/ServiciosL';
import Contacto from './componets/Contacto';
import Footer from './componets/Footer';
import ImageMosaic from './componets/mosaico';

const Landing = () => {
    return (
        <div className="landing-container">
            <Header />
            <main>
                <HeroSection />
                <ImageMosaic />  {/* Aquí insertas el mosaico dinámico */}
                <ComoFunciona />
                <Servicios />
                <Contacto />
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
