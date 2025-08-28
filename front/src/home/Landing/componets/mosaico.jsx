import React, { useState, useEffect } from "react";
import "./mosaico.css";

const images = [
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400444/download_ysnzsv.jpg", alt: "Fontanero" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1751548827/web-trabajo/y2j5cvgjpmy4uadjl25u.jpg", alt: "Electricista" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1752765275/web-trabajo/wocoul5qljqchxlsirwi.jpg", alt: "Jardinero" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400537/download_v7tmjh.jpg", alt: "Programador" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400494/download_zv8mzs.jpg", alt: "Diseñador" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400517/download_ridjwl.jpg", alt: "Personal de limpieza" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756405494/download_gji8qn.jpg", alt: "Carpintero" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756405549/download_sve5n9.jpg", alt: "Mecánico" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1752765360/web-trabajo/licn6cu4kpx4h3ljoycm.jpg", alt: "Pintor" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756405610/download_vpeaim.jpg", alt: "Chef" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756405658/download_dsdzte.jpg", alt: "Profesor particular" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756405694/download_apvnja.jpg", alt: "Cuidador de mayores" },
];

const ImageMosaic = () => {
    const [visibleImages, setVisibleImages] = useState(images);
    const [fadeIndex, setFadeIndex] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleImages((prev) => {
                const newImages = [...prev];
                const randomIndex = Math.floor(Math.random() * newImages.length);

                let newImage;
                do {
                    newImage = images[Math.floor(Math.random() * images.length)];
                } while (newImage.src === newImages[randomIndex].src);

                newImages[randomIndex] = newImage;

                // activar animación en esa celda
                setFadeIndex(randomIndex);
                setTimeout(() => setFadeIndex(null), 1000); // limpiar después de 1s

                return newImages;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mosaic-grid">
            {visibleImages.map((img, i) => (
                <div key={i} className={`mosaic-cell ${fadeIndex === i ? "fade" : ""}`}>
                    <img src={img.src} alt={img.alt} />
                </div>
            ))}
        </div>
    );
};

export default ImageMosaic;
