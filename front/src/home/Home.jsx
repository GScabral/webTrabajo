// 📦 IMPORTACIONES
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
    getAllUser, addLike, removeLike, getLikesByPost,
    checkUserLike, getAllService
} from "../redux/action/usersAction";
import {
    getAllPost, getCommentsByPost, deletePost, reportarPost
} from "../redux/action/postAction";
import { SocketContext } from "../context/SocketContext";
import useComments from "./post/comentarios/comentarios";
import PostForm from "./post/Postear";
import { useDarkMode } from "../context/darkMode";
import FavHandling from "../utils/fav/addFav";
import "./Home.css";

// 🏠 COMPONENTE PRINCIPAL
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        user: allUser, loading, infoLogin: infoUser,
        likesByPost, userLikesStatus, servicios: allService
    } = useSelector((state) => state.userState);

    const { allPost, allComments } = useSelector((state) => state.postState);
    const { onlineUsers } = useContext(SocketContext);

    const { darkMode, toggleDarkMode } = useDarkMode();
    const { showPostForm } = useOutletContext();
    const [selectedPostId, setSelectedPostId] = useState(null);

    // Estados de filtros
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
    const [servicioSeleccionado, setServicioSeleccionado] = useState("Todas");
    const [categoriaSeleccionadaPost, setCategoriaSeleccionadaPost] = useState("Todas");
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("Todas");

    const [hoveredPostId, setHoveredPostId] = useState(null);
    const [hoverTimer, setHoverTimer] = useState(null);

    const [likes, setLikes] = useState({});
    const [userLikes, setUserLikes] = useState({});
    const [openMenuPostId, setOpenMenuPostId] = useState(null);
    const [reportMenuPostId, setReportMenuPostId] = useState(null);

    const toggleMenu = (postId) => {
        setOpenMenuPostId(openMenuPostId === postId ? null : postId);
    };



    const top5Trabajadores = Array.isArray(allUser)
        ? allUser
            .filter(user => user.tipo === "trabajador")
            .sort((a, b) => {
                const promA = Number(a.Trabajador?.promedio_valoracion || 0);
                const promB = Number(b.Trabajador?.promedio_valoracion || 0);
                const votosA = Number(a.Trabajador?.numero_valoraciones || 0);
                const votosB = Number(b.Trabajador?.numero_valoraciones || 0);

                // Primero por promedio de valoración
                if (promB !== promA) return promB - promA;
                // Si hay empate, ordenar por cantidad de votos
                return votosB - votosA;
            })
            .slice(0, 5)
        : [];


    const motivosReportes = [
        "Contenido inapropiado",
        "Lenguaje ofensivo",
        "Spam o publicidad",
        "Información falsa",
        "Otro motivo"
    ];

    // Función para manejar el reporte
    const handleReport = (postId, motivo) => {
        dispatch(reportarPost({
            post_id: postId,
            user_id: infoUser.id,
            motivo: motivo
        }));
        setReportMenuPostId(null);
    };


    const {
        commentContent,
        setCommentContent,
        commentSubmitting,
        handleCommentSubmit
    } = useComments();


    useEffect(() => {
        dispatch(getAllUser());
        dispatch(getAllPost());
        dispatch(getAllService());
    }, [dispatch]);

    useEffect(() => {
        if (allPost.length > 0 && infoUser?.id) {
            allPost.forEach(post => {
                loadLikes(post.id);
                checkLikeStatus(post.id);
            });
        }
    }, [allPost, infoUser]);

    const loadLikes = async (postId) => {
        const response = await dispatch(getLikesByPost(postId));
        const totalLikes = response?.payload?.totalLikes ?? 0;
        setLikes(prev => ({ ...prev, [postId]: totalLikes }));
    };

    const checkLikeStatus = async (postId) => {
        if (!infoUser?.id) return;
        const response = await dispatch(checkUserLike(infoUser.id, postId));
        const hasLiked = response?.payload ?? false;
        setUserLikes(prev => ({ ...prev, [postId]: hasLiked }));
    };

    const handleLikeToggle = async (postId, e) => {
        e.preventDefault();
        e.stopPropagation();

        const hasLiked = userLikes[postId];

        if (hasLiked) {
            await dispatch(removeLike({ user_id: infoUser.id, post_id: postId }));
            setLikes(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
        } else {
            await dispatch(addLike({ user_id: infoUser.id, post_id: postId }));
            setLikes(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
        }

        setUserLikes(prev => ({ ...prev, [postId]: !hasLiked }));
    };
    const handleVerComentarios = (postId) => {
        if (selectedPostId === postId) {
            setSelectedPostId(null);
        } else {
            dispatch(getCommentsByPost(postId));
            setSelectedPostId(postId);
        }
    };

    const scrollProfesionales = (direction) => {
        const container = document.getElementById("profesionales-scroll");
        if (container) {
            const scrollAmount = 300;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    // 📌 Listas únicas para los select
    const categoriasUnicas = ["Todas", ...new Set(allService.map(s => s.categoria).filter(Boolean))];
    const serviciosUnicos = ["Todas", ...new Set(allService.map(s => s.nombre).filter(Boolean))];
    const ubicacionesUnicas = ["Todas", ...new Set((Array.isArray(allUser) ? allUser : []).map(u => u.ubicacion).filter(Boolean))];

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Cargando datos...</p>
            </div>
        );
    }



    return (
        <div className={`home-layout ${darkMode ? "dark-mode" : ""}`}>
            <main className="main-content">
                <header className="home-header">
                    <h2>¡Hola, <span className="user-name">{infoUser?.nombre}</span>!</h2>
                    <button className="toggle-dark-button" onClick={toggleDarkMode}>
                        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
                    </button>
                </header>



                {/* Publicar post */}
                {infoUser.tipo === "trabajador" && showPostForm && (
                    <PostForm userId={infoUser?.id} />
                )}
                <div className="top5-section">
                    <h3>🏆 Mejores calificados del mes</h3>
                    <ul>
                        {top5Trabajadores.map((trabajador, index) => (
                            <li key={trabajador.id} className="top-item">
                                <strong>#{index + 1}</strong> {trabajador.nombre}
                                — ⭐ {Number(trabajador.Trabajador.promedio_valoracion).toFixed(2)}
                                ({trabajador.Trabajador.numero_valoraciones} votos)
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Filtro de profesionales */}
                <div className="filtro-categoria">
                    <label>Filtrar por categoría: </label>
                    <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                        {categoriasUnicas.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <label>Filtrar por servicio: </label>
                    <select value={servicioSeleccionado} onChange={(e) => setServicioSeleccionado(e.target.value)}>
                        {serviciosUnicos.map((serv, i) => (
                            <option key={i} value={serv}>{serv}</option>
                        ))}
                    </select>

                    <label>Filtrar provincia: </label>
                    <select value={ubicacionSeleccionada} onChange={(e) => setUbicacionSeleccionada(e.target.value)}>
                        {ubicacionesUnicas.map((ubi, i) => (
                            <option key={i} value={ubi}>{ubi}</option>
                        ))}
                    </select>
                </div>
                {/* Profesionales */}
                <div className="profesionales-section">
                    <h3 className="profesionales-title">👥 Profesionales </h3>
                    <div className="scroll-container-wrapper">
                        <button className="scroll-button left" onClick={() => scrollProfesionales("left")}>←</button>
                        <div className="scroll-container" id="profesionales-scroll">
                            {Array.isArray(allUser) &&
                                allUser
                                    .filter(user => user.tipo === "trabajador")
                                    .filter(user => ubicacionSeleccionada === "Todas" || user.ubicacion === ubicacionSeleccionada)
                                    .filter(user => categoriaSeleccionada === "Todas" ||
                                        user.Trabajador?.Servicios?.some(serv => serv.categoria === categoriaSeleccionada)
                                    )
                                    .filter(user => servicioSeleccionado === "Todas" ||
                                        user.Trabajador?.Servicios?.some(serv => serv.nombre === servicioSeleccionado)
                                    )
                                    .slice(0, 6)
                                    .map((trabajador) => (
                                        <div key={trabajador.id} className="card-profile">
                                            {trabajador.foto_perfil ? (
                                                <img src={trabajador.foto_perfil} alt={trabajador.nombre} />
                                            ) : (
                                                <div className="placeholder-avatar">👤</div>
                                            )}
                                            <h4>{trabajador.nombre}</h4>
                                            <p className="profesion">{trabajador.Trabajador?.Servicios?.[0]?.nombre}</p>
                                            <p className="ubicacion">📍 {trabajador.ubicacion}</p>
                                            <p className="calificacion">
                                                ⭐ {trabajador.Trabajador.promedio_valoracion
                                                    ? Number(trabajador.Trabajador.promedio_valoracion).toFixed(2)
                                                    : "Sin valoración"}
                                            </p>
                                            <Link
                                                to={`/perfil/${trabajador.id}`}
                                                className="form-button"
                                            >
                                                Ver perfil
                                            </Link>
                                            <button
                                                className="form-button"
                                                onClick={() => navigate(`/chat/${trabajador.id}`)}
                                            >
                                                Mensaje
                                            </button>
                                            <span
                                                className={`status-indicator ${onlineUsers.includes(trabajador.id) ? 'online' : 'offline'}`}
                                                title={onlineUsers.includes(trabajador.id) ? '🟢 En línea' : '⚫ Desconectado'}
                                            />
                                        </div>
                                    ))
                            }
                        </div>
                        <button className="scroll-button right" onClick={() => scrollProfesionales("right")}>→</button>
                    </div>
                </div>

                {/* Muro de publicaciones */}
                <section className="foro-section">
                    <div className="filtro-categoria">
                        <label>Filtrar post por servicio: </label>
                        <select value={categoriaSeleccionadaPost} onChange={(e) => setCategoriaSeleccionadaPost(e.target.value)}>
                            {['Todas', ...new Set(allService.map(serv => serv.nombre))].map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <h3 className="section-title">💬 Muro de profesionales</h3>

                    <div className="post-list">
                        {allPost
                            .filter((post) => {
                                if (categoriaSeleccionadaPost === "Todas") return true;
                                const servicio = post.User?.Trabajador?.Servicios?.[0]?.nombre;
                                return servicio === categoriaSeleccionadaPost;
                            })
                            .map((post) => (
                                <div key={post.id} className="post-card">
                                    <div className="post-options">
                                        <button className="menu-button" onClick={() => toggleMenu(post.id)}>⋮</button>

                                        {openMenuPostId === post.id && (
                                            <div className="menu-dropdown">
                                                {infoUser?.id === post.user_id ? (
                                                    <button onClick={() => dispatch(deletePost(post.id))}>
                                                        🗑️ Eliminar
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button onClick={() => setReportMenuPostId(post.id)}>
                                                            🚩 Reportar
                                                        </button>

                                                        {reportMenuPostId === post.id && (
                                                            <div className="report-options">
                                                                <p>Selecciona un motivo:</p>
                                                                {motivosReportes.map((motivo, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        className="report-option-btn"
                                                                        onClick={() => handleReport(post.id, motivo)}
                                                                    >
                                                                        {motivo}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <h4>{post.titulo}</h4>
                                    <h5>Categoria:{post.User?.Trabajador?.Servicios?.[0]?.nombre}</h5>
                                    <p className="post-author">Autor: {post.User.nombre}</p>
                                    <p>{post.contenido}</p>
                                    <Link to={`/postDetail/${post.id}`}>
                                        {post.imagen_url && (
                                            <>
                                                <img
                                                    src={post.imagen_url}
                                                    alt={post.titulo}
                                                    className="post-img"
                                                    onMouseEnter={() => {
                                                        const timer = setTimeout(() => setHoveredPostId(post.id), 1000); // espera 1s
                                                        setHoverTimer(timer);
                                                    }}
                                                    onMouseLeave={() => {
                                                        clearTimeout(hoverTimer);
                                                    }}
                                                />

                                                {hoveredPostId === post.id && (
                                                    <div className="image-modal" onMouseLeave={() => setHoveredPostId(null)}>
                                                        <img src={post.imagen_url} alt={post.titulo} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Link>
                                    <p className="fecha-post">Publicado el: {new Date(post.fecha_creacion).toLocaleDateString()}</p>
                                    <div className="post-footer">
                                        <button
                                            type="button"
                                            className={`like-btn ${userLikes[post.id] ? 'liked' : ''}`}
                                            onClick={(e) => handleLikeToggle(post.id, e)}
                                        >
                                            {userLikes[post.id] ? '💖 Quitar Like' : '🤍 Me gusta'} ({likes[post.id] || 0})
                                        </button>
                                        <FavHandling></FavHandling>

                                        <button
                                            className="comments-toggle-btn"
                                            onClick={() => handleVerComentarios(post.id)}
                                        >
                                            {selectedPostId === post.id ? "Ocultar" : "Comentarios"}
                                        </button>
                                    </div>
                                    {selectedPostId === post.id && (
                                        <div className="comments-list">
                                            {allComments.length > 0 ? (
                                                allComments.map((comment) => (
                                                    <div key={comment.id} className="comment">
                                                        <div className="comment-header">
                                                            <img src={comment.User?.foto_perfil} alt={comment.User?.nombre} className="comment-avatar" />
                                                            <strong>{comment.User?.nombre}</strong>
                                                        </div>
                                                        <p>{comment.contenido}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-comments">No hay comentarios aún.</p>
                                            )}

                                            <div className="comment-form">
                                                <textarea
                                                    placeholder="Escribí un comentario..."
                                                    value={commentContent}
                                                    onChange={(e) => setCommentContent(e.target.value)}
                                                    rows={2}
                                                />
                                                <button
                                                    onClick={() => handleCommentSubmit(selectedPostId, infoUser.id)}
                                                    disabled={commentSubmitting}
                                                    className="form-button comment-submit-btn"
                                                >
                                                    {commentSubmitting ? "Enviando..." : "Comentar"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
