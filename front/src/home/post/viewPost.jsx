import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../redux/action/postAction";
import useComments from "./comentarios/comentarios";
import { useParams } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";
import { getUserById } from "../../redux/action/usersAction";
import { Link } from "react-router-dom";
import "./viewPost.css";

const DetailPost = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const infoPost = useSelector((state) => state.postState.infoPost);
    const infoUser = useSelector(state => state.userState.userById);

    const {
        commentContent,
        setCommentContent,
        commentSubmitting,
        handleCommentSubmit,
    } = useComments();

    // 🔹 Estado local para usuarios mencionables
    const [usuariosMencionables, setUsuariosMencionables] = useState([]);

    // Traer post
    useEffect(() => {
        if (id) {
            dispatch(getPostById(id));
        }
    }, [dispatch, id]);

    // Cuando se carguen los comentarios, obtener usuarios únicos
    useEffect(() => {
        const cargarUsuarios = async () => {
            if (infoPost?.Comments?.length > 0) {
                const uniqueUserIds = [...new Set(infoPost.Comments.map((c) => c.user_id))];
                const promises = uniqueUserIds.map((uid) => dispatch(getUserById(uid)));
                const results = await Promise.all(promises);

                const usuarios = results.map((res) => ({
                    id: res.id,
                    nombre: res.nombre,
                }));

                setUsuariosMencionables(usuarios);

            }
        };
        cargarUsuarios();
    }, [infoPost, dispatch]);

    if (!infoPost) return <p className="loading">⏳ Cargando publicación...</p>;


    // Función para resaltar menciones en comentarios
    const highlightMentions = (text) =>
        text.replace(/@([\wÁÉÍÓÚÑáéíóúñ\s]+)/g, '<span class="mention">@$1</span>');

    return (
        <div className="post-detail-container">
            {/* Hero */}
            <div className="post-hero">
                {infoPost.imagen_url && (
                    <img
                        src={infoPost.imagen_url}
                        alt={infoPost.titulo}
                        className="post-hero-image"
                    />
                )}
                <div className="post-hero-overlay">
                    <h1 className="post-hero-title">{infoPost.titulo}</h1>
                    <p className="post-date">
                        📅 {new Date(infoPost.fecha_creacion).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Contenido */}
            <div className="post-content-card">
                <p className="post-content">{infoPost.contenido}</p>
            </div>

            {/* Comentarios */}
            <div className="comments-section">
                <h3 className="comments-title">💬 Comentarios</h3>
                {infoPost.Comments && infoPost.Comments.length > 0 ? (
                    <div className="comments-list">
                        {infoPost.Comments.map((comment) => (
                            <div key={comment.id} className="comment-bubble">
                                <Link to={`/perfil/${comment.user_id}`}>
                                    <div className="comment-avatar">

                                        {infoUser.usuario?.nombre
                                            ? infoUser.usuario.nombre[0].toUpperCase()
                                            : "U"}
                                    </div>
                                </Link>
                                <div className="comment-body">
                                    {/* Menciones resaltadas */}
                                    <p
                                        className="comment-content"
                                        dangerouslySetInnerHTML={{
                                            __html: highlightMentions(comment.contenido),
                                        }}
                                    />
                                    <span className="comment-date">
                                        {new Date(comment.fecha).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-comments">Sé el primero en comentar 🚀</p>
                )}

                {/* Formulario de nuevo comentario con @ */}
                <div className="comment-form">
                    <MentionsInput
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Escribe tu comentario y usa @ para mencionar..."
                        className="mentions-input"
                    >
                        <Mention
                            trigger="@"
                            data={usuariosMencionables.map((u) => ({
                                id: u.id,
                                display: u.nombre,
                            }))}
                            markup="@__display__"
                            displayTransform={(id, display) => `@${display}`}   // 🔹 FIX
                        />
                    </MentionsInput>

                    <button
                        onClick={() => handleCommentSubmit(infoPost.id, infoUser.id)}
                        disabled={commentSubmitting}
                        className="comment-submit-btn"
                    >
                        {commentSubmitting ? "Enviando..." : "Comentar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailPost;
