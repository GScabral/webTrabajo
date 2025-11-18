import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/action/usersAction";
import { createCalificacion, getCalificacion, postView } from "../../redux/action/trabajadorAction";
import StarRating from "./StarRating";
import ContactModal from "./modalContacto";
import "./Perfil.css";

const Perfil = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.userState.userById);
  const calificaciones = useSelector((state) => state.trabajoState.calificaciones || []);
  const infoLogin = useSelector((state) => state.userState.infoLogin);

  const [tab, setTab] = useState("info");
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [openContact, setOpenContact] = useState(false);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getCalificacion(id));

    // Registrar vista (solo 1 vez)
    const registrarVista = async () => {
      if (infoLogin?.id === Number(id)) return;
      if (sessionStorage.getItem(`viewed_${id}`)) return;

      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const { ip } = await res.json();

        dispatch(
          postView(
            id,
            infoLogin?.id || null,
            ip,
            navigator.userAgent
          )
        );

        sessionStorage.setItem(`viewed_${id}`, "true");
      } catch (error) { }
    };

    registrarVista();
  }, [dispatch, id, infoLogin]);

  const trabajador = usuario?.Trabajador;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCalificacion({
        puntuacion,
        comentario,
        trabajador_id: id,
        cliente_id: infoLogin.id,
      })
    );
    setComentario("");
    setPuntuacion(0);
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="dashboard-wrapper">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-user">
          <img
            src={
              usuario.foto_perfil
                ? usuario.foto_perfil
                : "https://res.cloudinary.com/doauxswrl/image/upload/v1756478176/download_j9pkwx.png"
            }
            className="sidebar-avatar"
            alt=""
          />
          <h3>{usuario.nombre}</h3>
          <p className="side-loc">{usuario.ubicacion}</p>

          <button className="contact-btn" onClick={() => setOpenContact(true)}>
            📩 Contactar
          </button>
        </div>

        <div className="sidebar-menu">
          <button className={tab === "info" ? "active" : ""} onClick={() => setTab("info")}>
            Información
          </button>
          <button className={tab === "servicios" ? "active" : ""} onClick={() => setTab("servicios")}>
            Servicios ofrecidos
          </button>
          <button className={tab === "badges" ? "active" : ""} onClick={() => setTab("badges")}>
            Logros
          </button>
          <button className={tab === "comentarios" ? "active" : ""} onClick={() => setTab("comentarios")}>
            Comentarios
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="perfil-content">

        {/* Información */}
        {tab === "info" && (
          <section className="card fade">
            <h2 className="card-title">Información</h2>

            <div className="info-grid">
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Teléfono:</strong> {usuario.telefono}</p>

              {trabajador && (
                <>
                  <p><strong>Descripción:</strong> {trabajador.descripcion}</p>
                  <p><strong>Tarifa:</strong> ${trabajador.tarifa_minima} - ${trabajador.tarifa_maxima}</p>
                  <p><strong>Disponibilidad:</strong> {trabajador.disponibilidad}</p>
                  <p><strong>Valoración:</strong> ⭐ {trabajador.promedio_valoracion || 0}</p>
                </>
              )}
            </div>
          </section>
        )}

        {/* Servicios */}
        {tab === "servicios" && trabajador?.Servicios?.length > 0 && (
          <section className="card fade">
            <h2 className="card-title">Servicios ofrecidos</h2>

            <div className="servicios-grid">
              {trabajador.Servicios.map((s) => (
                <div className="servicio-item" key={s.id}>
                  <h4>{s.nombre}</h4>
                  <p className="categoria">{s.categoria}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Badges */}
        {tab === "badges" && usuario?.badges?.length > 0 && (
          <section className="card fade">
            <h2 className="card-title">Logros obtenidos</h2>

            <div className="badges-row">
              {usuario.badges.map((badge) => (
                <div key={badge.id} className="badge-item">
                  <img src={badge.icon_url} className="badge-icon" />
                  <div>
                    <p className="badge-name">{badge.nombre}</p>
                    <p className="badge-desc">{badge.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comentarios */}
        {tab === "comentarios" && (
          <section className="card fade">
            <h2 className="card-title">Dejá tu comentario</h2>

            <form onSubmit={handleSubmit} className="comentario-form">
              <label>Puntuación:</label>
              <StarRating puntuacion={puntuacion} setPuntuacion={setPuntuacion} />

              <textarea
                rows={5}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu comentario..."
                required
              />

              <button className="submit-btn">Enviar</button>
            </form>

            <h3 className="card-subtitle">Comentarios anteriores</h3>

            {calificaciones.length > 0 ? (
              calificaciones.map((c) => (
                <div className="review-item" key={c.id}>
                  <div className="review-author">⭐ {c.puntuacion}</div>
                  <p>{c.comentario}</p>
                </div>
              ))
            ) : (
              <p>No hay comentarios aún.</p>
            )}
          </section>
        )}
      </main>

      {/* MODAL */}
      <ContactModal
        open={openContact}
        onClose={() => setOpenContact(false)}
        profileId={infoLogin?.id}
        requesterId={infoLogin?.id}
      />
    </div>
  );
};

export default Perfil;
