import React, { useState, useEffect } from "react";
import "./mosaico.css";

const images = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Havana_-_Cuba_-_2566.jpg/330px-Havana_-_Cuba_-_2566.jpg", alt: "Fontanero" },
    { src: "https://www.mndelgolfo.com/blog/wp-content/uploads/2018/03/taller-de-carpinteria.jpg", alt: "Electricista" },
    { src: "https://static.vecteezy.com/system/resources/previews/024/637/060/non_2x/gardener-pruning-plants-with-garden-scissors-photo.jpg", alt: "Jardinero" },
    { src: "https://homesolution.net/blog/wp-content/uploads/2019/01/proud-gardener-539829042-5ac3d357ae9ab80037a73496.jpg", alt: "Programador" },
    { src: "https://resizer.iproimg.com/unsafe/1920x/filters:format(webp):quality(75):max_bytes(102400)/https://assets.iprofesional.com/assets/jpg/2019/08/482892.jpg", alt: "Diseñador" },
    { src: "https://media.istockphoto.com/id/1440019701/photo/close-up-of-plumber-repairing-sink-with-tool-in-bathroom.jpg?s=1024x1024&w=is&k=20&c=7DYtsIsJj3BqpJTOTw-iufDtNFzY0NidvpjHXYjZlRI=", alt: "Personal de limpieza" },
    { src: "https://www.shutterstock.com/shutterstock/photos/2605456113/display_1500/stock-photo-front-view-standing-and-holding-tool-mechanic-working-in-a-car-service-station-2605456113.jpg", alt: "Carpintero" },
    { src: "https://www.shutterstock.com/shutterstock/photos/2513962683/display_1500/stock-photo-a-mechanic-working-underneath-a-vehicle-in-a-garage-focusing-on-a-close-up-view-of-a-car-tire-in-2513962683.jpg", alt: "Mecánico" },
    { src: "https://res.cloudinary.com/doauxswrl/image/upload/v1752765360/web-trabajo/licn6cu4kpx4h3ljoycm.jpg", alt: "Pintor" },
    { src: "https://blog.uvm.mx/hs-fs/hubfs/shutterstock_690075232.jpg?width=800&height=600&name=shutterstock_690075232.jpg", alt: "Chef" },
    { src: "https://cdn-blog.superprof.com/blog_ar/wp-content/uploads/2018/03/ensenar-en-casa.jpg.webp", alt: "Profesor particular" },

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
