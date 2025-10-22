import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allFavPost, allFavTrabajador } from "../redux/action/favoriteAction";
import "./fav.css"



const Favoritos = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const allTabrajadorFav = useSelector((state) => state.favState.favTrabajador)
    const allPostFav = useSelector((state) => state.favState.favPost)

    console.log(id)


    useEffect(() => {
        if (id) {
            dispatch(allFavPost(id));
            dispatch(allFavTrabajador(id));
        }
    }, [dispatch, id]);



    console.log(allTabrajadorFav)
    console.log(allPostFav)


    return (
        <div className="favoritos-container">
            <h1 className="favoritos-title">Post Favoritos</h1>
            <div className="favoritos-grid">
                {Array.isArray(allPostFav) &&
                    allPostFav.map((fav) => (
                        <div key={fav.id} className="card">
                            <img
                                src={fav.post?.imagen_url}
                                alt={fav.post?.titulo}
                            />
                            <div className="card-content">
                                <h2>{fav.post?.titulo}</h2>
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
                {Array.isArray(allTabrajadorFav) &&
                    allTabrajadorFav.map((trab) => (
                        <div key={trab.id} className="card">
                            <img
                                src={trab.trabajador?.imagen_perfil}
                                alt={trab.trabajador?.nombre}
                            />
                            <div className="card-content">
                                <h2>{trab.trabajador?.nombre}</h2>
                                <p>{trab.trabajador?.descripcion}</p>
                                <small>
                                    Profesión: {trab.trabajador?.profesion}
                                </small>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};



export default Favoritos;