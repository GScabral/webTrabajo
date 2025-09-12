import React, { useEffect, useState, useRef } from "react";
import { FiHome, FiUser, FiMessageSquare, FiLogOut, FiUsers, FiBarChart, FiBell } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDarkMode } from "../../context/darkMode";
import { getNotifications, markAsRead } from "../../redux/action/notificationAction";
import useLogout from "../logOut/LogOut";
import "./Sidebar.css";


const Sidebar = ({ user, togglePostForm }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const noLeidos = useSelector((state) => state.mensajeState.noLeidos);
    const { darkMode } = useDarkMode();

    const [openNotif, setOpenNotif] = useState(false)
    const notifRef = useRef(null)

    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notificationState.list)




    useEffect(() => {
        function handleClickOutSide(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setOpenNotif(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide);
        return () => document.removeEventListener("mousedown", handleClickOutSide)
    }, [])

    useEffect(() => {
        if (user?.id) {
            dispatch(getNotifications(user.id));
        }
    }, [user, dispatch]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [togglePostForm]);

    useEffect(() => {
        if (location.pathname != "/home") {
            navigate("/home")
        }
    }, [togglePostForm])

    if (!user) return null;

    const menuItems = [
        { icon: <FiHome />, label: "Inicio", onClick: () => navigate("/home") },
        { icon: <FiUser />, label: "Mi Perfil", onClick: () => navigate(`/MiPerfil/${user.id}`) }
    ];

    if (user.tipo === "trabajador") {
        menuItems.push(
            { icon: <MdPostAdd />, label: "Crear publicación", onClick: togglePostForm },
            {
                icon: <FiMessageSquare />,
                label: "Mis Mensajes",
                onClick: () => navigate("/chatReciente"),
                badge: noLeidos
            }
        );
    }

    if (user.tipo === "cliente") {
        menuItems.push({
            icon: <FiMessageSquare />,
            label: "Chats",
            onClick: () => navigate("/chatReciente"),
            badge: noLeidos
        });
    }

    if (user.Admin && user.Admin.rol === "superadmin") {
        menuItems.push(
            {
                icon: <FiUsers />,
                label: "Control user",
                onClick: () => navigate("/controlUser")
            },
            {
                icon: <FaRegComments />,
                label: "Control Comment",
                onClick: () => navigate("/adminComment")
            },
            {
                icon: <MdPostAdd />,
                label: "Crear publicación",
                onClick: togglePostForm
            },
            {
                icon: <MdOutlinePostAdd />,
                label: "Control Post",
                onClick: () => navigate("/postadmin")
            },
            {
                icon: <FiBarChart />,
                label: "Estadisticas",
                onClick: () => navigate("/stats")
            },
            {
                icon: <FiBarChart />,
                label: "Reports",
                onClick: () => navigate("/reportes")
            }
        );
    }
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
    return (
        <aside className={`sidebar-container ${darkMode ? "dark-mode" : ""}`}>
            <div className="sidebar-header">
                <img src={user.foto_perfil} alt="perfil" className="sidebar-avatar" />
                <h3 className="sidebar-name">{user.nombre}</h3>
                <p className="sidebar-role">{user.tipo}</p>
            </div>

            <nav className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <button key={index} onClick={item.onClick} className="sidebar-item">
                        <span className="sidebar-icon">{item.icon}</span>
                        {item.label}
                        {item.badge > 0 && (
                            <span className="sidebar-badge">{item.badge}</span>
                        )}
                    </button>
                ))}
                <div ref={notifRef} className="relative">
                    <button onClick={() => setOpenNotif(!openNotif)} className="notif-button">
                        🔔 Notificaciones
                        {notifications.length > 0 && (
                            <span className="notif-badge">{notifications.length}</span>
                        )}
                    </button>

                    {openNotif && (
                        <div className="notif-dropdown">
                            <div className="notif-header">Notificaciones</div>

                            {notifications.length > 0 ? (
                                notifications.map((n) => (
                                    <div key={n.id} className="notif-item">
                                        <div className="notif-icon">
                                            {n.type === "like"
                                                ? "👍"
                                                : n.type === "comment"
                                                    ? "💬"
                                                    : "🔔"}
                                        </div>
                                        <div className="notif-content">
                                            <p className="notif-text">
                                                {n.type === "like" && (
                                                    <>Alguien dio like a tu publicación #{n.post_id}</>
                                                )}
                                                {n.type === "comment" && (
                                                    <>Alguien comentó en tu publicación #{n.post_id}</>
                                                )}
                                                {n.type !== "like" && n.type !== "comment" && (
                                                    <>Tienes una nueva notificación</>
                                                )}
                                            </p>
                                            <span className="notif-time">
                                                {new Date(n.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="notif-empty">No tienes notificaciones</div>
                            )}

                            <div className="notif-footer">Ver todas</div>
                        </div>
                    )}
                </div>
                <button onClick={logout} className="sidebar-item logout">
                    <span className="sidebar-icon"><FiLogOut /></span>
                    Cerrar sesión
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
