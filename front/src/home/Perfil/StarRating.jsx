import React from "react";
import "./StarRating.css";

const StarRating = ({ puntuacion, setPuntuacion }) => (
  <div className="tool-rating">
    {[1, 2, 3, 4, 5].map((n) => (
      <span
        key={n}
        className={n <= puntuacion ? "tool filled" : "tool"}
        onClick={() => setPuntuacion(n)}
        role="button"
        tabIndex={0}
        aria-label={`Puntuar con ${n} herramientas`}
        onKeyPress={(e) => { if (e.key === "Enter") setPuntuacion(n); }}
      >
        🧰
      </span>
    ))}
  </div>
);

export default StarRating;