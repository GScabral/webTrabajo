import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUser, changePassword, getLikesByUser } from "../../redux/action/usersAction"
import { getByPostUser } from "../../redux/action/postAction";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/darkMode";
import "./MiPerfil.css";
import { useParams } from "react-router-dom";

const MiPerfil = () => {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.userState.infoLogin);
  const likeUser = useSelector((state) => state.userState.likeByUser);
  const { id } = useParams();
  const { darkMode } = useDarkMode();


  const postByUser = useSelector((state) => state.postState.postByUser);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [nombre, setNombre] = useState(infoUser?.nombre || "");
  const [email, setEmail] = useState(infoUser?.email || "");
  const [ubicacion, setUbicacion] = useState(infoUser?.ubicacion || "");
  const [telefono, setTelefono] = useState(infoUser?.telefono || "");
  const [descripcion, setDescripcion] = useState(infoUser.Trabajador?.descripcion || "");
  const [tarifaMinima, setTarifaMinima] = useState(infoUser.Trabajador?.tarifa_minima || "");
  const [tarifaMaxima, setTarifaMaxima] = useState(infoUser.Trabajador?.tarifa_maxima || "");
  const [disponibilidad, setDisponibilidad] = useState(infoUser.Trabajador?.disponibilidad || "");
  const [fotoArchivo, setFotoArchivo] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(infoUser?.foto_perfil || "");
  const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");




  console.log("versiFunciona:", stats)



  useEffect(() => {
    if (id) {
      dispatch(getLikesByUser(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id) {
      dispatch(getByPostUser(id));
    }
  }, [dispatch, id]);

  const handleGuardar = async () => {
    const formData = new FormData();

    if (nombre !== infoUser.nombre) formData.append("nombre", nombre);
    if (email !== infoUser.email) formData.append("email", email);
    if (ubicacion !== infoUser.ubicacion) formData.append("ubicacion", ubicacion);
    if (telefono !== infoUser.telefono) formData.append("telefono", telefono);
    if (fotoArchivo) formData.append("foto_perfil", fotoArchivo); // nombre debe coincidir con upload.single('imagen')

    if (infoUser.tipo === "trabajador") {
      if (descripcion !== infoUser.Trabajador.descripcion)
        formData.append("descripcion", descripcion);
      if (tarifaMinima !== infoUser.Trabajador.tarifa_minima)
        formData.append("tarifa_minima", tarifaMinima);
      if (tarifaMaxima !== infoUser.Trabajador.tarifa_maxima)
        formData.append("tarifa_maxima", tarifaMaxima);
      if (disponibilidad !== infoUser.Trabajador.disponibilidad)
        formData.append("disponibilidad", disponibilidad);
    }

    try {
      await dispatch(updateUser(infoUser.id, formData)); // 🟢 importante: pasar FormData
      await dispatch(getUserById(infoUser.id));
      alert("✅ Cambios guardados correctamente");
      setModoEdicion(false);
    } catch (error) {
      console.error(error);
      alert("❌ Error al actualizar perfil");
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return alert("⚠️ Completa todos los campos.");
    }

    if (newPassword !== confirmPassword) {
      return alert("❌ Las contraseñas nuevas no coinciden.");
    }

    try {
      await dispatch(changePassword(oldPassword, newPassword));
      alert("✅ Contraseña actualizada correctamente.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMostrarCambioPassword(false);
    } catch (error) {
      console.error(error);
      alert("❌ Error al cambiar la contraseña.");
    }
  };




  return (
    <div className={`perfil-container  ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="perfil-titulo">👤 Mi Perfil</h1>

      {infoUser ? (
        <div className="perfil-card">
          <div className="perfil-header">
            <img
              src={infoUser.foto_perfil}
              alt={infoUser.nombre}
              className="perfil-imagen"
            />
            <div>
              <h2>{infoUser.nombre}</h2>
              <p className="perfil-id">ID: {infoUser.id}</p>
            </div>
          </div>

          {modoEdicion ? (
            <div className="perfil-formulario">
              <label>
                ✍️ Nombre:
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </label>

              <label>
                📧 Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                📧 wpp:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                📧 instagram / facebook:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label>
                📍 Ubicación:
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                />
              </label>

              <label>
                📱 Whatsapp:
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </label>

              {infoUser.tipo === "trabajador" && (
                <>
                  <label>
                    🧾 Descripción:
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </label>

                  <label>
                    💰 Tarifa mínima:
                    <input
                      type="number"
                      value={tarifaMinima}
                      onChange={(e) => setTarifaMinima(e.target.value)}
                    />
                  </label>

                  <label>
                    💰 Tarifa máxima:
                    <input
                      type="number"
                      value={tarifaMaxima}
                      onChange={(e) => setTarifaMaxima(e.target.value)}
                    />
                  </label>

                  <label>
                    📆 Disponibilidad:
                    <input
                      type="text"
                      value={disponibilidad}
                      onChange={(e) => setDisponibilidad(e.target.value)}
                    />
                  </label>
                </>
              )}

              <div className="perfil-botones">
                <label>
                  📷 Foto de perfil:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const archivo = e.target.files[0];
                      if (archivo) {
                        setFotoArchivo(archivo); // ✅ archivo tipo File
                        setFotoPerfil(URL.createObjectURL(archivo)); // ✅ para vista previa
                      }
                    }}
                  />
                </label>

                {fotoPerfil && (
                  <div className="preview-img">
                    <p>Vista previa:</p>
                    <img
                      src={fotoPerfil}
                      alt="Vista previa"
                      style={{ width: "120px", borderRadius: "8px", marginTop: "8px" }}
                    />
                  </div>
                )}
                <button className="btn guardar" onClick={handleGuardar}>
                  💾 Guardar
                </button>
                <button className="btn cancelar" onClick={() => setModoEdicion(false)}>
                  ❌ Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="perfil-datos">
              <p><strong>📧 Email:</strong> {infoUser.email}</p>
              <p><strong>👥 Tipo:</strong> {infoUser.tipo}</p>
              <p><strong>📍 Ubicación:</strong> {infoUser.ubicacion}</p>
              <p><strong>📱 Teléfono:</strong> {infoUser.telefono}</p>
              <p><strong>✅ Verificado:</strong> {infoUser.verificado ? "Sí" : "No"}</p>

              {infoUser.tipo === "trabajador" && (
                <div className="perfil-servicio">
                  <h3>🛠️ Perfil Profesional</h3>
                  <p><strong>Servicio:</strong> {infoUser.Trabajador.Servicios[0]?.nombre}</p>
                  <p><strong>Descripción:</strong> {infoUser.Trabajador.descripcion}</p>
                  <p><strong>Tarifa:</strong> ${infoUser.Trabajador.tarifa_minima} - ${infoUser.Trabajador.tarifa_maxima}</p>
                  <p><strong>Disponibilidad:</strong> {infoUser.Trabajador.disponibilidad}</p>
                  <p><strong>Valoración:</strong> ⭐ {infoUser.Trabajador.Servicios[0]?.promedio_valoracion}</p>
                </div>
              )}
              {/* <div className="profile-stats">
                <span>{formatNumber(allStats.views)} visitas</span>
                <span>{formatNumber(allStats.contacts)} contactos</span>
              </div> */}

              <div className="perfil-botones">
                <button className="btn editar" onClick={() => setModoEdicion(true)}>
                  ✏️ Editar Perfil
                </button>
                <button className="btn cambiar-pass" onClick={() => setMostrarCambioPassword(!mostrarCambioPassword)}>
                  🔐 Cambiar contraseña
                </button>
              </div>

              {mostrarCambioPassword && (
                <div className="perfil-formulario cambio-password">
                  <h3>🔐 Cambiar contraseña</h3>

                  <label>
                    Contraseña actual:
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </label>

                  <label>
                    Nueva contraseña:
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>

                  <label>
                    Confirmar nueva contraseña:
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>

                  <div className="perfil-botones">
                    <button className="btn guardar" onClick={handleChangePassword}>
                      💾 Guardar nueva contraseña
                    </button>
                    <button className="btn cancelar" onClick={() => setMostrarCambioPassword(false)}>
                      ❌ Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="perfil-alerta">⚠️ No hay información de usuario.</p>
      )}

      {postByUser?.length > 0 && (
        <div className="perfil-posts-container">
          <h2 className="perfil-posts-titulo">📸 Publicaciones de {infoUser.nombre}</h2>
          <div className="perfil-posts-grid">
            {postByUser.map((post) => (
              <div className="post-card" key={post.id}>
                <Link to={`/postDetail/${post.id}`}>
                  <img src={post.imagen_url} alt={post.titulo} className="post-img" />
                </Link>
                <h3 className="post-titulo">{post.titulo}</h3>
                <p className="post-contenido">{post.contenido}</p>
                <p className="post-fecha">📅 {new Date(post.fecha_creacion).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <h1 className="titulo">ULTIMOS LIKE</h1>
      <div className="MyLikes">
        {likeUser.map((likes) => (
          <div key={likes.id} className="mostrarLikes">
            <p>{likes.Post.titulo}</p>
            <p>{likes.Post.contenido}</p>
            <img src={likes.Post.imagen_url} alt={likes.Post.titulo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiPerfil;