import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markAsRead } from "../../redux/action/notificationAction";
import "./NotificationList.css";

const NotificationList = ({ userId }) => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notificationState.list);

    // 🔹 Formatear mensaje sin recrearlo en cada render
    const formatNotification = useCallback((n) => {
        const actor = n.actor?.nombre || "Alguien";

        const messages = {
            like_post: `${actor} le dio like a tu publicación`,
            comment_on_post: `${actor} comentó en tu publicación`,
            reply_comment: `${actor} respondió a tu comentario`,
        };

        return messages[n.type] || "Tienes una nueva notificación";
    }, []);

    // 🔹 Formatear fecha de manera más robusta
    const formatDate = (date) =>
        new Date(date).toLocaleString("es-ES", {
            dateStyle: "short",
            timeStyle: "short",
        });

    useEffect(() => {
        if (userId) dispatch(getNotifications(userId));
    }, [userId, dispatch]);

    // 🔹 Manejo de lista vacía
    if (!notifications || notifications.length === 0) {
        return (
            <div className="notification-container">
                <h3 className="notification-title">🔔 Notificaciones</h3>
                <p className="notification-empty">No tienes notificaciones por ahora</p>
            </div>
        );
    }

    return (
        <div className="notification-container">
            <h3 className="notification-title">🔔 Notificaciones</h3>

            {notifications.map((n) => {
                const { id, actor, post, read_at, created_at } = n;

                return (
                    <div
                        key={id}
                        className={`notification-item ${read_at ? "read" : "unread"}`}
                        onClick={() => dispatch(markAsRead(id))}
                    >
                        {/* Avatar */}
                        <img
                            src={actor?.foto_perfil || "/img/default-avatar.png"}
                            alt={actor?.nombre}
                            className="notification-avatar"
                            onError={(e) => (e.target.src = "/img/default-avatar.png")}
                        />

                        {/* Contenido */}
                        <div className="notification-content">
                            <p className="notification-text">{formatNotification(n)}</p>
                            <small className="notification-time">{formatDate(created_at)}</small>
                        </div>

                        {/* Imagen del post (si existe) */}
                        {post?.imagen_url && (
                            <img
                                src={post.imagen_url}
                                alt="post"
                                className="notification-post-img"
                                onError={(e) =>
                                    (e.target.style.display = "none")
                                }
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default NotificationList;
