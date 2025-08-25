import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../redux/action/postAction";
import useComments from "./comentarios/comentarios";
import { useParams } from "react-router-dom";
import "./viewPost.css";

const DetailPost = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const infoPost = useSelector((state) => state.postState.infoPost);
    const { infoLogin: infoUser } = useSelector((state) => state.userState);

    const {
        commentContent,
        setCommentContent,
        commentSubmitting,
        handleCommentSubmit,
    } = useComments();

    useEffect(() => {
        if (id) {
            dispatch(getPostById(id));
        }
    }, [dispatch, id]);

    if (!infoPost) return <p className="loading">⏳ Cargando publicación...</p>;

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
                                <div className="comment-avatar">
                                    {comment.usuario?.nombre
                                        ? comment.usuario.nombre[0].toUpperCase()
                                        : "U"}
                                </div>
                                <div className="comment-body">
                                    <p className="comment-content">{comment.contenido}</p>
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

                {/* Formulario de nuevo comentario */}
                <div className="comment-form">
                    <textarea
                        placeholder="Escribe tu comentario..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        rows={2}
                    />
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
