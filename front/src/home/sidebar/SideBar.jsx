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
                    <button
                        onClick={() => setOpenNotif(!openNotif)}
                        className="sidebar-item"
                    >
                        {openNotif && <p style={{ color: "red" }}>DEBUG: Dropdown abierto</p>}
                        <span className="sidebar-icon"><FiBell /></span>
                        Notificaciones
                        {notifications.filter(n => !n.read_at).length > 0 && (
                            <span className="sidebar-badge">
                                {notifications.filter(n => !n.read_at).length}
                            </span>
                        )}
                    </button>

                    {/* Dropdown */}
                    {openNotif && (
                        <div className="notif-dropdown">
                            {notifications.length === 0 ? (
                                <p className="notif-empty">No tienes notificaciones</p>
                            ) : (
                                notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        className={`notif-item ${n.read_at ? "read" : "unread"}`}
                                        onClick={() => dispatch(markAsRead(n.id))}
                                    >
                                        <p>{n.type === "mention" ? "Te mencionaron" : n.type}</p>
                                        {n.meta?.snippet && <small>{n.meta.snippet}</small>}
                                    </div>
                                ))
                            )}
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
