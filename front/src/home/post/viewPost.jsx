import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../redux/action/postAction";
import useComments from "./comentarios/comentarios";
import { useParams, Link } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";
import "./viewPost.css";

const DetailPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const infoPost = useSelector((state) => state.postState.infoPost);
  const currentUser = useSelector((state) => state.userState.infoLogin);



  const {
    commentContent,
    setCommentContent,
    commentSubmitting,
    handleCommentSubmit,
  } = useComments();

  const [usuariosMencionables, setUsuariosMencionables] = useState([]);
  console.log(infoPost)

  // Traer publicación
  useEffect(() => {
    if (id) dispatch(getPostById(id));
  }, [dispatch, id]);

  // Cargar usuarios mencionables una vez cargados los comentarios
  useEffect(() => {
    if (infoPost?.Comments?.length > 0) {
      const usuarios = infoPost.Comments.map((c) => ({
        id: c.Usuario?.id,
        nombre: c.Usuario?.nombre,
      })).filter((u) => u.id && u.nombre);
      const unique = Array.from(
        new Map(usuarios.map((u) => [u.id, u])).values()
      );
      setUsuariosMencionables(unique);
    }
  }, [infoPost]);

  if (!infoPost) {
    return <p className="loading">⏳ Cargando publicación...</p>;
  }

  const highlightMentions = (text) =>
    text.replace(
      /@([\wÁÉÍÓÚÑáéíóúñ\s]+)/g,
      '<span class="mention">@$1</span>'
    );

  return (
    <div className="post-detail-container">
      {/* HEADER */}
      <div className="post-hero">
        <img
          src={infoPost.imagen_url || "https://via.placeholder.com/900x400"}
          alt={infoPost.titulo}
          className="post-hero-image"
        />
        <div className="post-hero-overlay">
          <h1 className="post-hero-title">{infoPost.titulo}</h1>
          <p className="post-date">
            📅 {new Date(infoPost.fecha_creacion).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="post-content-card">
        <p className="post-content">{infoPost.contenido}</p>
      </div>

      {/* COMENTARIOS */}
      <div className="comments-section">
        <h3 className="comments-title">💬 Comentarios</h3>

        {infoPost.Comments?.length > 0 ? (
          <div className="comments-list">
            {infoPost.Comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <Link to={`/perfil/${comment.user_id}`}>
                  <div className="comment-avatar">
                    {comment.Usuario?.foto_perfil ? (
                      <img
                        src={comment.Usuario.foto_perfil}
                        alt={comment.Usuario.nombre}
                      />
                    ) : (
                      <span>{comment.Usuario?.nombre?.[0] || "U"}</span>
                    )}
                  </div>
                </Link>
                <div className="comment-body">
                  <p
                    className="comment-content"
                    dangerouslySetInnerHTML={{
                      __html: highlightMentions(comment.contenido),
                    }}
                  />
                  <span className="comment-author">
                    — {comment.Usuario?.nombre || "Usuario desconocido"}
                  </span>
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

        {/* NUEVO COMENTARIO */}
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
              displayTransform={(id, display) => `@${display}`}
            />
          </MentionsInput>

          <button
            onClick={() => handleCommentSubmit(infoPost.id, currentUser.id)}
            disabled={commentSubmitting}
            className="comment-submit-btn"
          >
            {commentSubmitting ? "Enviando..." : "💬 Comentar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
