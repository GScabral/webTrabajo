import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost,deletePost } from "../../redux/action/postAction";
import "./PostAdmin.css";

const PostAdmin = () => {
  const dispatch = useDispatch();

  // Traer posts del store
  const { allPost, loading, error } = useSelector((state) => state.postState);

  useEffect(() => {
    dispatch(getAllPost()); // cargar todos los posts al montar
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm("¿Seguro que quieres eliminar este post?")) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <div className="postAdminContainer">
      <h2>📋 Panel de Administración de Posts</h2>

      {loading && <p>Cargando posts...</p>}
      {error && <p className="error">{error}</p>}

      <div className="postGrid">
        {allPost.length > 0 ? (
          allPost.map((post) => (
            <div key={post.id} className="postCardAdmin">
              <h3>{post.titulo}</h3>
              <p>{post.contenido}</p>
              {post.imagen_url && (
                <img
                  src={post.imagen_url}
                  alt={post.titulo}
                  className="postImage"
                />
              )}
              <p>
                <strong>Autor:</strong> {post.user?.nombre || "Desconocido"}
              </p>

              <button
                className="deleteButton"
                onClick={() => handleDelete(post.id)}
              >
                🗑 Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default PostAdmin;
