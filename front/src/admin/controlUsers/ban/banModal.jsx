import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/action/usersAction";
import "./BanModal.css";

const BanModal = ({ user }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    // convertir fecha ISO a algo legible
    const fechaBan = new Date(user.bloqueado_hasta).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="banOverlay">
            <div className="banCard">
                <h2>🚫 Cuenta Suspendida</h2>
                <p>
                    Hola <strong>{user.nombre}</strong>, tu cuenta ha sido baneada.
                </p>
                <p>
                    <strong>Duración:</strong> Hasta el <span>{fechaBan}</span>
                </p>
                <p>Por favor, contacta con soporte si crees que es un error.</p>
                <p>AJAJA POR LOCOOOO.COMUNICATE CON ESTAAAAAA SI QUERES RECUPERAR</p>
                <button className="logoutButton" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default BanModal;
