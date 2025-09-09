import API from "../../Api/axios";

export const getNotifications = (userId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");

        const { data } = await API.get(`/notification/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "GET_NOTIFICATIONS", payload: data });
    } catch (error) {
        console.error("Error al obtener notificaciones:", error);
    }
};

// ✅ Marcar una notificación como leída
export const markAsRead = (notificationId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");

        const { data } = await API.patch(`/notification/${notificationId}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "MARK_AS_READ", payload: data });
    } catch (error) {
        console.error("Error al marcar notificación:", error);
    }
};

// ✅ Marcar todas como leídas
export const markAllAsRead = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");

        await API.patch(`/notification/read-all`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "MARK_ALL_AS_READ" });
    } catch (error) {
        console.error("Error al marcar todas:", error);
    }
};