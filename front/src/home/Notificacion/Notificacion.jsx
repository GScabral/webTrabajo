import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markAsRead } from "../redux/actions/notificationActions";

const NotificationList = ({ userId }) => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notificationState.list);

    const formatNotification = (n) => {
        switch (n.type) {
            case "like_post":
                return `Alguien le dio like a tu publicación #${n.post_id}`;
            case "comment_post":
                return `Alguien comentó en tu publicación #${n.post_id}`;
            case "reply_comment":
                return `Alguien respondió a tu comentario #${n.comment_id}`;
            default:
                return "Tienes una nueva notificación";
        }
    };

    console.log(notifications)

    useEffect(() => {
        if (userId) dispatch(getNotifications(userId));
    }, [userId, dispatch]);

    return (
        <div>
            <h3>🔔 Notificaciones</h3>
            {notifications.map((n) => (
                <div
                    key={n.id}
                    style={{ background: n.read_at ? "#eee" : "#fff", cursor: "pointer", padding: "8px", margin: "4px 0" }}
                    onClick={() => dispatch(markAsRead(n.id))}
                >
                    {formatNotification(n)}
                    <br />
                    <small>{new Date(n.created_at).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
