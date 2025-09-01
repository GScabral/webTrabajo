import API from "../../Api/axios";

export const getAllUser = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_USERS_REQUEST" });
    try {
        const response = await API.get(`/user/getAllUser`);


        dispatch({
            type: "GET_ALL_USERS_SUCCESS",
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: "GET_ALL_USERS_FAIL",
            payload: error.response.data.message
        })
    }
}
export const getAllService = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_SERVICIO_REQUEST" });
    try {
        const response = await API.get(`/servicio/allService`);
        dispatch({
            type: "GET_ALL_SERVICIO_SUCCESS",
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: "GET_ALL_SERVICIO_FAIL",
            payload: error.response.data.message
        })
    }
}





export const getUserById = (id) => async (dispatch) => {
    dispatch({ type: "GETBYID_USER_REQUEST" })

    try {
        const response = await API.get(`/user/userById/${id}`);
        dispatch({
            type: "GETBYID_USER_SUCCESS",
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: "GETBYID_USER_FAILURE",
            payload: error.message,
        })
    }
}



export const loginUserById = (id) => async (dispatch) => {
    dispatch({ type: "LOGINBYID_USER_REQUEST" })

    try {
        const response = await API.get(`/user/userById/${id}`);
        dispatch({
            type: "LOGINBYID_USER_SUCCESS",
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: "LOGINBYID_USER_FAILURE",
            payload: error.message,
        })
    }
}

export const registerUser = (userData) => (dispatch) => {
    dispatch({ type: "REGISTER_USER_REQUEST" });

    console.log(userData)
    
    try {
        const response = API.post(`/user/register`, userData);
        dispatch({
            type: "REGISTER_USER_SUCCESS",
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: "REGISTER_USER_FAIL",
            payload: error.response.data.mensage
        })
    }
}

export const loginUser = (userData) => {
    return async function (dispatch) {
        try {
            const response = await API.post(`/user/login`, userData);


            localStorage.setItem("token", response.data.token);

            dispatch({
                type: "LOGIN_USER_SUCCESS",
                payload: response.data,
            });

            return response;
        } catch (error) {
            const message = error.response?.data?.error || "Error al iniciar sesión";
            dispatch({ type: "LOGIN_USER_FAIL", payload: message });
            throw new Error(message);
        }
    };
};

export const logout = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
       
        // Enviar token al backend para invalidarlo
        await API.post(
            '/user/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Eliminar token en frontend
        localStorage.removeItem('token');

        dispatch({ type: "LOGOUT" });
    } catch (error) {
        console.error('Error al cerrar sesión', error);
        // Aunque falle, igual limpiamos el estado
        localStorage.removeItem('token');
        dispatch({ type: "LOGOUT" });
    }
};

export const addLike = ({ user_id, post_id }) => async (dispatch) => {
    dispatch({ type: "ADD_LIKE_REQUEST" });
    try {
        const response = await API.post(`/user/like`, {
            user_id,
            post_id
        });
        dispatch({
            type: "ADD_LIKE_SUCCESS",
            payload: response.data,
        });
        return { payload: response.data };
    } catch (error) {
        dispatch({
            type: "ADD_LIKE_FAIL",
            payload: error.response?.data?.error || error.message,
        });
        return { error: error.message };
    }
};

// 🔥 Quitar Like
export const removeLike = ({ user_id, post_id }) => async (dispatch) => {
    dispatch({ type: "REMOVE_LIKE_REQUEST" });
    try {
        const response = await API.delete(`/user/like`, {
            data: { user_id, post_id }
        });
        dispatch({
            type: "REMOVE_LIKE_SUCCESS",
            payload: response.data,
        });
        return { payload: response.data };
    } catch (error) {
        dispatch({
            type: "REMOVE_LIKE_FAIL",
            payload: error.response?.data?.error || error.message,
        });
        return { error: error.message };
    }
};

// 🔥 Obtener likes de un post
export const getLikesByPost = (postId) => async (dispatch) => {
    dispatch({ type: "GET_LIKES_BY_POST_REQUEST" });
    try {
        const response = await API.get(`/user/like/${postId}`);
        dispatch({
            type: "GET_LIKES_BY_POST_SUCCESS",
            payload: { postId, totalLikes: response.data.totalLikes },
        });
        return { payload: { postId, totalLikes: response.data.totalLikes } };
    } catch (error) {
        dispatch({
            type: "GET_LIKES_BY_POST_FAIL",
            payload: error.response?.data?.error || error.message,
        });
        return { error: error.message };
    }
};

// 🔥 Verificar si un usuario ha dado like
export const checkUserLike = (userId, postId) => async (dispatch) => {
    dispatch({ type: "CHECK_USER_LIKE_REQUEST" });
    try {
        const response = await API.get(`/user/like/check/${userId}/${postId}`);
        dispatch({
            type: "CHECK_USER_LIKE_SUCCESS",
            payload: response.data.hasLiked,
            meta: { postId }
        });
        return { payload: response.data.hasLiked };
    } catch (error) {
        dispatch({
            type: "CHECK_USER_LIKE_FAIL",
            payload: error.response?.data?.error || error.message,
        });
        return { error: error.message };
    }
};


export const updateUser = (userId, data) => async (dispatch) => {
    dispatch({ type: "UPDATE_USER_REQUEST" });

    try {
        const response = await API.put(
            `/user/usuario/${userId}`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        dispatch({
            type: "UPDATE_USER_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_USER_FAILURE",
            payload: error.response?.data?.error || "Error al actualizar el usuario",
        });
    }
};




export const changePassword = (oldPassword, newPassword) => async (dispatch, getState) => {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

    try {
        const token = getState().userState.token; // ⬅️ Ajusta esto según tu estructura, parece ser userState

        

        const response = await API.patch(
            '/user/change-password',
            {
                oldPassword,
                newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: "UPDATE_PASSWORD_SUCCESS",
            payload: response.data.message
        });

    } catch (error) {
        console.error("❌ Error en changePassword:", error);

        dispatch({
            type: "UPDATE_PASSWORD_FAILURE",
            payload: error.response?.data?.error || "Error al cambiar la contraseña"
        });
    }
};




export const resetPassword = (email, token, newPassword) => async (dispatch) => {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });
    console.log("se manda:", token)
    try {
        const response = await API.patch('/user/reset-password', {
            email,
            token,
            newPassword
        });

        dispatch({
            type: "RESET_PASSWORD_SUCCESS",
            payload: response.data.message
        });
    } catch (error) {
        console.error("❌ Error en resetPassword:", error);

        dispatch({
            type: "RESET_PASSWORD_FAIL",
            payload: error.response?.data?.error || "Error al restablecer la contraseña"
        });
    }
};

export const requestPasswordReset = (email) => async (dispatch) => {
    dispatch({ type: "REQUEST_PASSWORD_RESET_START" });

    try {
        const response = await API.post('/user/request-password-reset', { email });

        dispatch({
            type: "REQUEST_PASSWORD_RESET_SUCCESS",
            payload: response.data.message, // ejemplo: "Se ha enviado un correo..."
        });
    } catch (error) {
        console.error("❌ Error en requestPasswordReset:", error);

        dispatch({
            type: "REQUEST_PASSWORD_RESET_FAIL",
            payload: error.response?.data?.error || "Error al enviar el correo"
        });
    }
};