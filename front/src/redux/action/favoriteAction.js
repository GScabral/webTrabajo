import API from "../../Api/axios";



export const allFavPost = (user_id) => async (dispatch) => {
    dispatch({ type: "GET_FAVPOST_REQUEST" });

    try {
        const response = await API.get(`/fav/getPostFav/${user_id}`)
        dispatch({
            type: "GET_FAVPOST_SUCCESS",
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: "GET_FAVPOST_FAIL"
        })
    }
}



export const allFavTrabajador = (user_id) => async (dispatch) => {
    dispatch({ type: "GET_FAVTRABAJADOR_REQUEST" });

    try {
        const response = await API.get(`/fav/getTrabajadoresFav/${user_id}`)
        console.log(response)
        dispatch({
            type: "GET_FAVTRABAJADOR_SUCCESS",
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: "GET_FAVTRABAJADOR_FAIL"
        })
    }
}

export const newFav = (favData) => async (dispatch) => {
    dispatch({ type: "POST_FAV_REQUEST" })
    console.log(favData)
    try {
        const response = await API.post("/fav/addFav", favData)
        dispatch({
            type: "POST_FAV_SUCCESS",
            payload: response.data
        })
    } catch (error) {
        dispatch({ type: "POST_FAV_FAIL" })
    }
}


export const removeFavAcc = (user_id, target_type, target_id) => async (dispatch) => {
    dispatch({ type: "DELETE_FAV_REQUEST" });
    try {
        const response = await API.delete(`/fav/removeFav/${user_id}/${target_type}/${target_id}`);
        dispatch({
            type: "DELETE_FAV_SUCCESS",
            payload: { user_id, target_type, target_id, server: response.data }
        });
        return response.data;
    } catch (error) {
        console.error("removeFavAcc error:", error);
        dispatch({
            type: "DELETE_FAV_FAIL",
            payload: error.response?.data || error.message
        });
        throw error;
    }
};