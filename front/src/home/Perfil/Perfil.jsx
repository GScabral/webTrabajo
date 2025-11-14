import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/action/usersAction";
import { createCalificacion, getCalificacion, postView, allStats } from "../../redux/action/trabajadorAction";
import StarRating from "./StarRating";
import "./Perfil.css";
import ContactModal from "./modalContacto";

const Perfil = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userState.userById);
  const loading = useSelector(state => state.userState.loading);
  const calificaciones = useSelector(state => state.trabajoState.calificaciones || []);
  const infoLogin = useSelector(state => state.userState.infoLogin);
  const infoUser = useSelector((state) => state.userState.infoLogin);
  const loggedUser = useSelector((state) => state.userState.infoLogin);

  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [openContact, setOpenContac] = useState(false)
  console.log(usuario)

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getCalificacion(id));

    // 👇 Registrar la vista del perfil
    const registrarVista = async () => {
      try {
        if (infoLogin?.id === Number(id)) return;
        if (sessionStorage.getItem(`viewed_${id}`)) return; // evita duplicar vista
        // 🔹 Obtener IP pública del visitante
        const res = await fetch("https://api.ipify.org?format=json");
        const { ip } = await res.json();

        // 🔹 Evitar registrar vista si el usuario ve su propio perfil
        if (infoLogin?.id === Number(id)) return;

        // 🔹 Registrar vista en el backend
        dispatch(
          postView(
            id,                        // profile_id
            infoLogin?.id || null,     // viewer_id
            ip,                        // viewer_ip
            navigator.userAgent        // user_agent
          )
        );
      } catch (error) {
        console.error("❌ Error al registrar vista:", error);
      }
    };

    registrarVista();
  }, [dispatch, id, infoLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCalificacion({
      puntuacion,
      comentario,
      trabajador_id: id,
      cliente_id: infoLogin.id
    }));
    setComentario("");
    setPuntuacion(5);
  };

  if (loading || !usuario) return <p className="loading">Cargando perfil...</p>;

  console.log(calificaciones)

  const trabajador = usuario.Trabajador;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-card">

        {/* Encabezado con imagen y datos */}
        <div className="perfil-header">
          {usuario.foto_perfil && usuario.foto_perfil.trim() !== "" ? (
            <img src={usuario.foto_perfil} alt={usuario.nombre} className="avatar" />
          ) : (
            <img
              src="https://res.cloudinary.com/doauxswrl/image/upload/v1756478176/download_j9pkwx.png"
              alt="avatar por defecto"
              className="avatar"
            />
          )}          <h2 className="nombre">{usuario.nombre}</h2>
          <p className="ubicacion">📍 {usuario.ubicacion}</p>
          <button className="contact-btn" onClick={() => setOpenContac(true)}>📨 Contactar</button>
        </div>
        <ContactModal
          open={openContact}
          onClose={() => setOpenContac(false)}
          profileId={infoUser?.id}
          requesterId={loggedUser?.id}
        />
        {/* Datos principales */}
        <div className="info-detalle">
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>

          {usuario.tipo === "trabajador" && trabajador && (
            <>
              <p><strong>Descripción:</strong> {trabajador.descripcion}</p>
              <p><strong>Tarifa:</strong> ${trabajador.tarifa_minima} - ${trabajador.tarifa_maxima}</p>
              <p><strong>Disponibilidad:</strong> {trabajador.disponibilidad}</p>
              <p><strong>Valoración:</strong> ⭐ {trabajador.promedio_valoracion ? Number(trabajador.promedio_valoracion).toFixed(2) : "Sin valoraciones"}</p>            </>
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
        {usuario?.badges?.length > 0 && (
          <div className="perfil-badges-container">
            <h2 className="perfil-badges-titulo">🏆 Logros obtenidos</h2>

            <div className="perfil-badges-grid">
              {usuario.badges.map((badge) => (
                <div key={badge.id} className="badge-card">
                  <img
                    src={badge.icon_url}
                    alt={badge.nombre}
                    className="badge-icon"
                  />

                  <div className="badge-info">
                    <h3>{badge.nombre}</h3>
                    <p>{badge.descripcion}</p>
                    <small>📅 {new Date(badge.UserBadges.created_at).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>
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
            {calificaciones
              .filter(c => c && typeof c.puntuacion !== "undefined")
              .map(c => (
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
