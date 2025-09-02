import axios from "axios";
import API from "../../Api/axios";



export const getAdminCommetn = () => async (dispatch) => {
    dispatch({ type: "ADMINCOMMENT_GET_REQUEST" });

    try {
        const token = localStorage.getItem("token"); // lo guardas al iniciar sesión
        console.log(token)
        const response = await API.get(
            "/admin/getAllComments",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({
            type: "ADMINCOMMENT_SUCCES",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "ADMINCOMMENT_FAIL",
            payload: error.response?.data?.error || "Error al traer comentarios",
        });
    }
};


export const getAllUserAdmin = () => async (dispatch) => {
    dispatch({ type: "GET_ALLUSERADMIN_REQUEST" })

    try {
        const token = localStorage.getItem("token"); // lo guardas al iniciar sesión


        const response = await API.get("/admin/getAllUserAdmin", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        dispatch({
            type: "GET_ALLUSERADMIN_SUCCES",
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: "GET_ALLUSERADMIN_FAIL"
        })
    }
}
export const getAllReport = () => async (dispatch) => {
    dispatch({ type: "GET_ALLREPORTPOST_REQUEST" })

    try {
        const token = localStorage.getItem("token"); // lo guardas al iniciar sesión


        const response = await API.get("/admin/getAllReport", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        console.log(response)
        dispatch({
            type: "GET_ALLREPORTPOST_SUCCES",
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: "GET_ALLREPORTPOST_FAIL"
        })
    }
}

export const banUser = (userId, bloqueado_hasta) => async (dispatch) => {
    dispatch({ type: "BAN_USER_REQUEST" });


    try {

        const token = localStorage.getItem("token"); // lo guardas al iniciar sesión

        const response = await API.patch(
            `/admin/blockUser/${userId}`,
            { bloqueado_hasta }, // body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // headers en el tercer parámetro
                },
            }
        );

        dispatch({
            type: "BAN_USER_SUCESS",
            payload: response.data.mensaje, // tu backend devuelve "mensaje"
        });
    } catch (error) {
        dispatch({
            type: "BAN_USER_FAIL",
            payload: error.response?.data?.error || "Error al bloquear usuario",
        });
    }
};
export const UnBanUser = (userId) => async (dispatch) => {
    dispatch({ type: "UNBAN_USER_REQUEST" });

    try {
        const token = localStorage.getItem("token"); // se guarda al iniciar sesión

        const response = await API.patch(
            `/admin/unblockUser/${userId}`,
            {}, // cuerpo vacío, ya que no envías datos
            {
                headers: {
                    Authorization: `Bearer ${token}`, // headers van aquí
                },
            }
        );

        dispatch({
            type: "UNBAN_USER_SUCESS",
            payload: response.data.mensaje, // backend devuelve "mensaje"
        });
    } catch (error) {
        dispatch({
            type: "UNBAN_USER_FAIL",
            payload: error.response?.data?.error || "Error al desbloquear usuario",
        });
    }
};



export const deleteComment = (commentId) => async (dispatch) => {
    dispatch({ type: "DELETECOMMENT_REQUEST" });

    try {

        const token = localStorage.getItem("token"); // lo guardas al iniciar sesión

        const response = await API.delete(`/admin/deleteComment/${commentId}`);

        dispatch({
            type: "DELETECOMMENT_SUCESS",
            payload: response.data
        });
    } catch (error) {
        dispatch({ type: "DELETECOMMENT_FAIL", error: error.message });
    }
};



export const statsAdmin = () => async (dispatch) => {
    dispatch({ type: "GET_STATS_REQUEST" })

    try {
        const token = localStorage.getItem("token");

        const response = await API.get("/admin/getStats", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        dispatch({
            type: "GET_STATS_SUCESS",
            payload: response.data
        })

        console.log("esto llega", response)
    } catch (error) {
        dispatch({ type: "GET_STATS_FAIL", error: error.ma })

    }
}

export const getReportByPost = (postId) => async (dispatch) => {
    dispatch({ type: "GET_REPORTBYPOST_REQUEST" });

    try {
        const token = localStorage.getItem("token");
        const { data } = await API.get(`/admin/getReportByPost/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        dispatch({
            type: "GET_REPORTBYPOST_SUCCESS",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "GET_REPORTBYPOST_FAIL",
            payload: error.response?.data?.error || error.message
        });
    }
};