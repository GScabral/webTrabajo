import axios from "axios";

// Enviar mensaje
export const sendMensaje = (data) => async (dispatch) => {
    dispatch({ type: "POST_MENSAJE_REQUEST" });
    console.log(data)
    try {
        const response = await axios.post("http://localhost:3001/mensaje/sendMensaje", data);
        dispatch({
            type: "SEND_MENSAJE_SUCCESS",
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: "SEND_MENSAJE_FAIL",
            payload: error.response?.data?.error || error.message
        });
    }
};

// Obtener chats recientes
export const getChatsRecientes = (userId) => async (dispatch) => {
    dispatch({ type: "GET_CHATS_RECIENTES_REQUEST" });
    try {
        const response = await axios.get(`http://localhost:3001/mensaje/chatsRecientes/${userId}`);
        dispatch({
            type: "GET_CHATS_RECIENTES_SUCCESS",
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: "GET_CHATS_RECIENTES_FAIL",
            payload: error.response?.data?.error || error.message
        });
    }
};

// Obtener conversación entre dos usuarios
export const getConversacion = (userId1, userId2) => async (dispatch) => {
    dispatch({ type: "GET_CONVERSACION_REQUEST" });
    try {
        const response = await axios.get(`http://localhost:3001/mensaje/conversacion/${userId1}/${userId2}`);
        dispatch({
            type: "GET_CONVERSACION_SUCCESS",
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: "GET_CONVERSACION_FAIL",
            payload: error.response?.data?.error || error.message
        });
    }
};


// Marcar toda la conversación como leída
export const marcarConversacionLeida = (userId, chatWithId) => async (dispatch) => {
    dispatch({ type: "MARCAR_MENSAJE_LEIDO_REQUEST" });
    try {
        await axios.patch("http://localhost:3001/mensaje/marcarConversacionLeida", {
            userId,
            chatWithId
        });
        dispatch({ type: "MARCAR_MENSAJE_LEIDO_SUCCESS" });
        // Refresca los chats recientes para actualizar el contador de no leídos
        dispatch(getChatsRecientes(userId));
    } catch (error) {
        dispatch({
            type: "MARCAR_MENSAJE_LEIDO_FAIL",
            payload: error.response?.data?.error || error.message
        });
    }
};