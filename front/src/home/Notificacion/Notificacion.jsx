import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, markAsRead } from "../redux/actions/notificationActions";

const NotificationList = ({ userId }) => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notificationState.list);

    useEffect(() => {
        if (userId) dispatch(getNotifications(userId));
    }, [userId, dispatch]);

    return (
        <div>
            <h3>🔔 Notificaciones</h3>
            {notifications.map((n) => (
                <div
                    key={n.id}
                    style={{ background: n.read_at ? "#eee" : "#fff" }}
                    onClick={() => dispatch(markAsRead(n.id))}
                >
                    {n.type} - {n.meta?.snippet}
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
