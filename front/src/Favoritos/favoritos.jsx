import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allFavPost, allFavTrabajador } from "../redux/action/favoriteAction";




const Favoritos = () => {
    const { id } = useParams(id)
    const dispatch = useDispatch();
    const allTabrajadorFav = useSelector((state) => state.favState.favTrabajador)
    const allPostFav = useSelector((state) => state.favState.favPost)




    useEffect((id) => {
        dispatch(allFavPost(id))
    }, [dispatch, id])

    useEffect((id) => {
        dispatch(allFavTrabajador(id))
    }, [dispatch, id])


    console.log(allTabrajadorFav)
    console.log(allPostFav)

    
    return (
        <div>
            Favoritos
        </div>
    )
}



export default Favoritos;