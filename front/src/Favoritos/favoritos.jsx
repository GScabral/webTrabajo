import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allFavPost, allFavTrabajador, removeFavAcc } from "../redux/action/favoriteAction";
import "./fav.css";

const Favoritos = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const allTrabajadorFav = useSelector((state) => state.favState.favTrabajador);
    const allPostFav = useSelector((state) => state.favState.favPost);
    const infoUser = useSelector((state) => state.userState.infoLogin); // <-- asegúrate de tener esto en Redux

    useEffect(() => {
        if (id) {
            dispatch(allFavPost(id));
            dispatch(allFavTrabajador(id));
        }
    }, [dispatch, id]);

    console.log(infoUser)

    const handleRemove = async (postId) => {
        try {
            await dispatch(removeFavAcc(infoUser.id, "post", postId));
            console.log("Favorito eliminado:", postId);
        } catch (err) {
            console.error("Error al eliminar favorito:", err);
            alert("No se pudo eliminar el favorito. Inténtalo de nuevo.");
        }
    };

    console.log(allTrabajadorFav)
    return (
        <div className="favoritos-container">
            <h1 className="favoritos-title">Post Favoritos</h1>
            <div className="favoritos-grid">
                {Array.isArray(allPostFav) &&
                    allPostFav.map((fav) => (
                        <div key={fav.id} className="card">
                            <div className="card-header">
                                <h2>{fav.post?.titulo}</h2>
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemove(fav.post?.id)}
                                    title="Eliminar de favoritos"
                                >
                                    💔
                                </button>
                            </div>
                            <img src={fav.post?.imagen_url} alt={fav.post?.titulo} />
                            <div className="card-content">
                                <p>{fav.post?.contenido}</p>
                                <small>
                                    Publicado el:{" "}
                                    {new Date(fav.post?.fecha_creacion).toLocaleDateString()}
                                </small>
                            </div>
                        </div>
                    ))}
            </div>

            <h1 className="favoritos-title">Trabajadores de tu confianza</h1>
            <div className="favoritos-grid">
                {Array.isArray(allTrabajadorFav) &&
                    allTrabajadorFav.map((trab) => (
                        <div key={trab.user?.id} className="card">
                            <img
                                src={trab.user?.foto_perfil}
                                alt={trab.user?.nombre}
                            />
                            <div className="card-content">
                                <h2>{trab.user?.nombre}</h2>
                                <p>{trab.user?.email}</p>
                                <p>{trab.user?.descripcion}</p>
                                <small>Profesión: {trab.trabajador?.profesion}</small>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Favoritos;
