// MiPerfil.jsx (Rediseñado - Dashboard style)

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getUserById,
  updateUser,
  changePassword,
  getLikesByUser,
} from "../../redux/action/usersAction";
import { getByPostUser } from "../../redux/action/postAction";
import { allStats } from "../../redux/action/trabajadorAction";
import InfoIcon from "../../utils/infoIcon/infoIcon";
import { useDarkMode } from "../../context/darkMode";
import "./MiPerfil.css";

const MiPerfil = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { darkMode } = useDarkMode();

  // global state
  const infoUser = useSelector((s) => s.userState.infoLogin) || null;
  const likeUser = useSelector((s) => s.userState.likeByUser) || [];
  const postByUser = useSelector((s) => s.postState.postByUser) || [];
  const stats = useSelector((s) => s.trabajoState.allStats) || {};
  const contactos = useSelector((s) => s.trabajoState.totalContactos) || 0;

  // local UI state (form / edit mode)
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  // form fields (kept in a single object)
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    ubicacion: "",
    telefono: "",
    descripcion: "",
    tarifaMinima: "",
    tarifaMaxima: "",
    disponibilidad: "",
  });

  // password change
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState({ oldPassword: "", newPassword: "", confirm: "" });

  // keep local form in sync when infoUser loads/changes
  useEffect(() => {
    if (infoUser) {
      setForm((f) => ({
        ...f,
        nombre: infoUser.nombre || "",
        email: infoUser.email || "",
        ubicacion: infoUser.ubicacion || "",
        telefono: infoUser.telefono || "",
        descripcion: infoUser.Trabajador?.descripcion || "",
        tarifaMinima: infoUser.Trabajador?.tarifa_minima || "",
        tarifaMaxima: infoUser.Trabajador?.tarifa_maxima || "",
        disponibilidad: infoUser.Trabajador?.disponibilidad || "",
      }));
      setPreview(infoUser.foto_perfil || "");
    }
  }, [infoUser]);

  // fetch data for the profile (stats / posts / likes)
  useEffect(() => {
    if (!id) return;
    dispatch(allStats(id));
    dispatch(getByPostUser(id));
    dispatch(getLikesByUser(id));
  }, [dispatch, id]);

  // handlers
  const onChangeField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const onPickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!infoUser) return;
    const formData = new FormData();

    // append only changed values (simple comparison)
    if (form.nombre !== infoUser.nombre) formData.append("nombre", form.nombre);
    if (form.email !== infoUser.email) formData.append("email", form.email);
    if (form.ubicacion !== infoUser.ubicacion) formData.append("ubicacion", form.ubicacion);
    if (form.telefono !== infoUser.telefono) formData.append("telefono", form.telefono);
    if (avatarFile) formData.append("foto_perfil", avatarFile);

    if (infoUser.tipo === "trabajador") {
      if (form.descripcion !== infoUser.Trabajador?.descripcion)
        formData.append("descripcion", form.descripcion);
      if (String(form.tarifaMinima) !== String(infoUser.Trabajador?.tarifa_minima))
        formData.append("tarifa_minima", form.tarifaMinima);
      if (String(form.tarifaMaxima) !== String(infoUser.Trabajador?.tarifa_maxima))
        formData.append("tarifa_maxima", form.tarifaMaxima);
      if (form.disponibilidad !== infoUser.Trabajador?.disponibilidad)
        formData.append("disponibilidad", form.disponibilidad);
    }

    try {
      await dispatch(updateUser(infoUser.id, formData));
      await dispatch(getUserById(infoUser.id));
      setEditing(false);
      alert("✅ Cambios guardados");
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar");
    }
  };

  const handlePasswordChange = async () => {
    if (!pwd.oldPassword || !pwd.newPassword || !pwd.confirm) {
      return alert("⚠️ Completa todos los campos");
    }
    if (pwd.newPassword !== pwd.confirm) return alert("❌ Las contraseñas no coinciden");
    try {
      await dispatch(changePassword(pwd.oldPassword, pwd.newPassword));
      setPwd({ oldPassword: "", newPassword: "", confirm: "" });
      setShowPwd(false);
      alert("✅ Contraseña cambiada");
    } catch (err) {
      console.error(err);
      alert("❌ Error al cambiar contraseña");
    }
  };

  // simple presentational helpers
  const renderBadges = () => (
    <div className="badges-compact">
      {infoUser?.badges?.length ? (
        infoUser.badges.map((b) => (
          <div className="badge" key={b.id} title={b.descripcion}>
            <img src={b.icon_url} alt={b.nombre} />
          </div>
        ))
      ) : (
        <span className="muted">Sin insignias</span>
      )}
    </div>
  );

  return (
    <div className={`mi-perfil root ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        {/* LEFT COLUMN - SIDEBAR */}
        <aside className="side">
          <div className="card profile-card">
            <div className="avatar-wrap">
              <img src={preview || "/default-avatar.png"} alt={form.nombre || "Usuario"} className="avatar" />
            </div>

            <h2 className="user-name">{infoUser?.nombre || "Usuario"}</h2>
            <div className="user-meta">{infoUser?.tipo || "-"} · ID {infoUser?.id || "-"}</div>

            <div className="side-actions">
              <button className="btn primary" onClick={() => setEditing(true)}>✏️ Editar perfil</button>
              <button className="btn outline" onClick={() => setShowPwd((s) => !s)}>🔐 Cambiar contraseña</button>
            </div>

            <div className="side-section">
              <h4>Contactos</h4>
              <div className="stat-line"><strong>{contactos || 0}</strong><span>Contactos</span></div>
              <div className="stat-line"><strong>{stats?.views || 0}</strong><span>Visitas</span></div>
            </div>

            <div className="side-section">
              <h4>Insignias</h4>
              {renderBadges()}
            </div>
          </div>

          {/* QUICK POSTS (small preview) */}
          {/* <div className="card quick-posts">
            <h4>Últimas publicaciones</h4>
            <div className="posts-list">
              {postByUser?.slice(0, 4).map((p) => (
                <Link to={`/postDetail/${p.id}`} className="post-row" key={p.id}>
                  <img src={p.imagen_url} alt={p.titulo} />
                  <div>
                    <div className="post-title">{p.titulo}</div>
                    <div className="post-date">{new Date(p.fecha_creacion).toLocaleDateString()}</div>
                  </div>
                </Link>
              ))}
              {!postByUser?.length && <div className="muted">Sin publicaciones</div>}
            </div>
          </div> */}
        </aside>

        {/* RIGHT COLUMN - MAIN */}
        <main className="main">
          {/* HEADER ROW */}
          <div className="header-row">
            <h1>Mi Perfil</h1>
            <div className="header-actions">
              <button className="btn ghost" onClick={() => window.print()}>🖨️ Imprimir</button>
            </div>
          </div>

          {/* INFO & EDIT FORM */}
          <div className="grid two-col">
            <div className="card info-card">
              <h3>Información</h3>

              {!editing ? (
                <div className="info-grid">
                  <div><strong>Nombre</strong><div className="muted">{infoUser?.nombre || '-'}</div></div>
                  <div><strong>Email</strong><div className="muted">{infoUser?.email || '-'}</div></div>
                  <div><strong>Ubicación</strong><div className="muted">{infoUser?.ubicacion || '-'}</div></div>
                  <div><strong>Teléfono</strong><div className="muted">{infoUser?.telefono || '-'}</div></div>

                  {infoUser?.tipo === 'trabajador' && (
                    <>
                      <div className="full"><strong>Servicio</strong><div className="muted">{infoUser.Trabajador?.Servicios?.[0]?.nombre || '-'}</div></div>
                      <div className="full"><strong>Descripción</strong><div className="muted">{infoUser.Trabajador?.descripcion || '-'}</div></div>
                    </>
                  )}
                </div>
              ) : (
                <div className="form-grid">
                  <label>
                    Nombre
                    <input value={form.nombre} onChange={onChangeField('nombre')} />
                  </label>

                  <label>
                    Email
                    <input value={form.email} onChange={onChangeField('email')} />
                  </label>

                  <label>
                    Ubicación
                    <input value={form.ubicacion} onChange={onChangeField('ubicacion')} />
                  </label>

                  <label>
                    Teléfono
                    <input value={form.telefono} onChange={onChangeField('telefono')} />
                  </label>

                  {infoUser?.tipo === 'trabajador' && (
                    <>
                      <label className="full">
                        Descripción
                        <textarea value={form.descripcion} onChange={onChangeField('descripcion')} />
                      </label>

                      <label>
                        Tarifa mínima
                        <input type="number" value={form.tarifaMinima} onChange={onChangeField('tarifaMinima')} />
                      </label>

                      <label>
                        Tarifa máxima
                        <input type="number" value={form.tarifaMaxima} onChange={onChangeField('tarifaMaxima')} />
                      </label>

                      <label>
                        Disponibilidad
                        <input value={form.disponibilidad} onChange={onChangeField('disponibilidad')} />
                      </label>
                    </>
                  )}

                  <label className="full">
                    Foto de perfil
                    <input type="file" accept="image/*" onChange={onPickAvatar} />
                    {preview && <img src={preview} alt="preview" className="preview-img" />}
                  </label>

                  <div className="form-actions">
                    <button className="btn primary" onClick={handleSave}>💾 Guardar</button>
                    <button className="btn outline" onClick={() => { setEditing(false); setPreview(infoUser?.foto_perfil || ''); }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>

            {/* PASSWORD & STATS */}
            <div className="card pwd-stats-card">
              {/* Cambiar password */}
              <div className="pwd-section">
                <h3>Cambiar contraseña</h3>
                {showPwd ? (
                  <div className="pwd-form">
                    <label>
                      Actual
                      <input type="password" value={pwd.oldPassword} onChange={(e) => setPwd({ ...pwd, oldPassword: e.target.value })} />
                    </label>
                    <label>
                      Nueva
                      <input type="password" value={pwd.newPassword} onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })} />
                    </label>
                    <label>
                      Confirmar
                      <input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} />
                    </label>

                    <div className="form-actions">
                      <button className="btn primary" onClick={handlePasswordChange}>Guardar</button>
                      <button className="btn outline" onClick={() => setShowPwd(false)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="muted">Haz click en "Cambiar contraseña" en la barra lateral para abrir el formulario.</div>
                )}

                {/* quick stats */}
                <div className="stats-compact">
                  <div className="stat-row"><strong>{stats?.views || 0}</strong><span>Visitas</span></div>
                  <div className="stat-row"><strong>{likeUser?.length || 0}</strong><span>Likes</span></div>
                  <div className="stat-row"><strong>{postByUser?.length || 0}</strong><span>Publicaciones</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* POSTS GRID */}
          <div className="card posts-card">
            <h3>Publicaciones</h3>
            <div className="posts-grid">
              {postByUser?.length ? (
                postByUser.map((post) => (
                  <div className="post-card" key={post.id}>
                    <Link to={`/postDetail/${post.id}`}>
                      <img src={post.imagen_url} alt={post.titulo} />
                    </Link>
                    <div className="post-body">
                      <div className="post-title">{post.titulo}</div>
                      <div className="post-excerpt">{post.contenido}</div>
                      <div className="post-meta">{new Date(post.fecha_creacion).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="muted">No hay publicaciones para mostrar.</div>
              )}
            </div>
          </div>

          {/* LIKES */}
          <div className="card likes-card">
            <h3>Últimos Likes</h3>
            <div className="likes-grid">
              {likeUser?.length ? (
                likeUser.map((l) => (
                  <div className="like-item" key={l.id}>
                    <img src={l.Post?.imagen_url} alt={l.Post?.titulo} />
                    <div>
                      <div className="like-title">{l.Post?.titulo}</div>
                      <div className="muted small">{l.Post?.contenido}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="muted">Sin likes recientes</div>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default MiPerfil;

