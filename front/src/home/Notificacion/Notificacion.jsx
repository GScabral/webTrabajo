import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markAsRead } from "../../redux/action/notificationAction";
import "./NotificationList.css"; // 👈 Importa el CSS

const NotificationList = ({ userId }) => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notificationState.list);

    const formatNotification = (n) => {
        switch (n.type) {
            case "like_post":
                return `${n.actor.nombre} le dio like a tu publicación`;
            case "comment_on_post":
                return `${n.actor.nombre} comentó en tu publicación`;
            case "reply_comment":
                return `${n.actor.nombre} respondió a tu comentario`;
            default:
                return "Tienes una nueva notificación";
        }
    };

    useEffect(() => {
        if (userId) dispatch(getNotifications(userId));
    }, [userId, dispatch]);

    return (
        <div className="notification-container">
            <h3 className="notification-title">🔔 Notificaciones</h3>
            {notifications.map((n) => (
                <div
                    key={n.id}
                    className={`notification-item ${n.read_at ? "read" : "unread"}`}
                    onClick={() => dispatch(markAsRead(n.id))}
                >
                    <img
                        src={n.actor.foto_perfil}
                        alt={n.actor.nombre}
                        className="notification-avatar"
                    />
                    <div className="notification-content">
                        <p className="notification-text">{formatNotification(n)}</p>
                        <small className="notification-time">
                            {new Date(n.created_at).toLocaleString()}
                        </small>
                    </div>
                    {n.post?.imagen_url && (
                        <img
                            src={n.post.imagen_url}
                            alt="post"
                            className="notification-post-img"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
