import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getChatsRecientes} from "../../../redux/action/mensajesAction"
import { useNavigate } from "react-router-dom";
import "./ChatReciente.css"

const ChatsRecientes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const infoUser = useSelector((state) => state.userState.infoLogin);
    const chats = useSelector((state) => state.mensajeState.chatsRecientes);


    console.log(infoUser)

    useEffect(() => {
        if (infoUser?.id) {
            dispatch(getChatsRecientes(infoUser.id));
        }
    }, [dispatch, infoUser]);

    return (
        <div className="chats-recientes-container">
            <h2>Mis mensajes</h2>
            {chats.length === 0 ? (
                <p>No tienes mensajes aún.</p>
            ) : (
                <ul>
                    {chats.map(chat => (
                        <li key={chat.usuario.id} className="chat-preview" onClick={() => navigate(`/chat/${chat.usuario.id}`)}>
                            <img src={chat.usuario.foto_perfil} alt={chat.usuario.nombre} className="chat-avatar" />
                            <div>
                                <strong>{chat.usuario.nombre}</strong>
                                <p>{chat.ultimoMensaje.contenido}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatsRecientes;