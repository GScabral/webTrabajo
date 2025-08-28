import React, { useState, useEffect } from "react";
import "./mosaico.css";

const images = [
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400444/download_ysnzsv.jpg", alt: "Fontanero" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1751548827/web-trabajo/y2j5cvgjpmy4uadjl25u.jpg", alt: "Electricista" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1752765275/web-trabajo/wocoul5qljqchxlsirwi.jpg", alt: "Jardinero" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400537/download_v7tmjh.jpg", alt: "Programador" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400494/download_zv8mzs.jpg", alt: "Diseñador" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1756400517/download_ridjwl.jpg", alt: "Personal de limpieza" },
];

const ImageMosaic = () => {
    const [visibleImages, setVisibleImages] = useState(images);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleImages((prev) => {
                const newImages = [...prev];
                // elegir índice aleatorio
                const randomIndex = Math.floor(Math.random() * newImages.length);
                // elegir nueva imagen que no sea la misma
                let newImage;
                do {
                    newImage = images[Math.floor(Math.random() * images.length)];
                } while (newImage.src === newImages[randomIndex].src);

                newImages[randomIndex] = newImage;
                return newImages;
            });
        }, 4000); // cambia cada 4 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mosaic-grid">
            {visibleImages.map((img, i) => (
                <div key={i} className="mosaic-cell">
                    <img src={img.src} alt={img.alt} />
                </div>
            ))}
        </div>
    );
};

export default ImageMosaic;
