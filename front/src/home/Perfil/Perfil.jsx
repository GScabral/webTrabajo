import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/action/usersAction";
import { createCalificacion, getCalificacion } from "../../redux/action/trabajadorAction";
import StarRating from "./StarRating";
import "./Perfil.css";

const Perfil = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userState.userById);
  const loading = useSelector(state => state.userState.loading);
  const calificaciones = useSelector(state => state.trabajoState.calificaciones || []);

  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(5);
  const [cliente_id] = useState(1); // Reemplazar con el ID real del cliente logueado

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getCalificacion(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCalificacion({
      puntuacion,
      comentario,
      trabajador_id: id,
      cliente_id
    }));
    setComentario("");
    setPuntuacion(5);
  };

  if (loading || !usuario) return <p className="loading">Cargando perfil...</p>;

  const trabajador = usuario.Trabajador;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-card">
        
        {/* Encabezado con imagen y datos */}
        <div className="perfil-header">
          <img src={usuario.foto_perfil} alt={usuario.nombre} className="avatar" />
          <h2 className="nombre">{usuario.nombre}</h2>
          <p className="ubicacion">📍 {usuario.ubicacion}</p>
          <button className="contact-btn">📨 Contactar</button>
        </div>

        {/* Datos principales */}
        <div className="info-detalle">
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>

          {usuario.tipo === "trabajador" && trabajador && (
            <>
              <p><strong>Descripción:</strong> {trabajador.descripcion}</p>
              <p><strong>Tarifa:</strong> ${trabajador.tarifa_minima} - ${trabajador.tarifa_maxima}</p>
              <p><strong>Disponibilidad:</strong> {trabajador.disponibilidad}</p>
              <p><strong>Valoración:</strong> ⭐ {trabajador.promedio_valoracion || "Sin valoraciones"}</p>
            </>
          )}
        </div>

        {/* Servicios */}
        {trabajador?.Servicios?.length > 0 && (
          <div className="servicios card-section">
            <h3>🛠️ Servicios ofrecidos</h3>
            <ul>
              {trabajador.Servicios.map(s => (
                <li key={s.id}>✔ {s.nombre} <span className="categoria">({s.categoria})</span></li>
              ))}
            </ul>
          </div>
        )}

        {/* Comentarios */}
        <div className="comentarios-section card-section">
          <h3>💬 Dejá tu comentario</h3>
          <form onSubmit={handleSubmit}>
            <label>Puntuación:</label>
            <StarRating puntuacion={puntuacion} setPuntuacion={setPuntuacion} />
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
              required
              rows={4}
            />
            <button type="submit" className="enviar-btn">Enviar calificación</button>
          </form>
        </div>

        {/* Reseñas */}
        {calificaciones.length > 0 && (
          <div className="reseñas card-section">
            <h3>🗨️ Reseñas de clientes</h3>
            {calificaciones.map(c => (
              <div key={c.id} className="comentario-burbuja">
                <div className="comentario-top">
                  <strong>⭐ {c.puntuacion}</strong>
                </div>
                <p>{c.comentario}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
