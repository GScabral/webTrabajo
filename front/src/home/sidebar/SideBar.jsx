import React from "react";
import { FiHome, FiUser, FiMessageSquare, FiLogOut, FiUsers,FiBarChart } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../logOut/LogOut";
import "./Sidebar.css";

const Sidebar = ({ user, togglePostForm }) => {
    const navigate = useNavigate();
    const logout = useLogout();
    const noLeidos = useSelector((state) => state.mensajeState.noLeidos);

    if (!user) return null;

    const menuItems = [
        { icon: <FiHome />, label: "Inicio", onClick: () => navigate("/Home") },
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
        <aside className="sidebar-container">
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
                <button onClick={logout} className="sidebar-item logout">
                    <span className="sidebar-icon"><FiLogOut /></span>
                    Cerrar sesión
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
