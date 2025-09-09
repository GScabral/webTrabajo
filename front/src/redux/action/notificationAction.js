import API from "../../Api/axios";

export const getNotifications = (userId) => async (dispatch) => {
    try {
        const { data } = await API.get(`/notification/${userId}`);
        dispatch({ type: "GET_NOTIFICATIONS", payload: data });
    } catch (error) {
        console.error("Error al obtener notificaciones:", error);
    }
};

// ✅ Marcar una notificación como leída
export const markAsRead = (notificationId) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/notification/${notificationId}/read`);
        dispatch({ type: "MARK_AS_READ", payload: data });
    } catch (error) {
        console.error("Error al marcar notificación:", error);
    }
};

// ✅ Marcar todas como leídas
export const markAllAsRead = () => async (dispatch) => {
    try {
        await API.patch(`/notification/read-all`);
        dispatch({ type: "MARK_ALL_AS_READ" });
    } catch (error) {
        console.error("Error al marcar todas:", error);
    }
};