import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConversacion, sendMensaje, marcarConversacionLeida } from "../../redux/action/mensajesAction";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import "./Chat.css";

const socket = io(
  import.meta.env.PROD
    ? "https://webtrabajo.onrender.com"
    : "http://localhost:3001",
  { withCredentials: true }
);

const Chat = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // ID del receptor
  const infoUser = useSelector((state) => state.userState.infoLogin);
  const conversacion = useSelector((state) => state.mensajeState.conversacion);
  const [contenido, setContenido] = useState("");
  const [mostrarEmojiPicker, setMostrarEmojiPicker] = useState(false);
  const mensajesRef = useRef(null);

  useEffect(() => {
    if (infoUser?.id && id) {
      dispatch(getConversacion(infoUser.id, id));
      socket.emit("joinRoom", { userId: infoUser.id, chatWith: id });
    }

    socket.on("mensajeNuevo", () => {
      dispatch(getConversacion(infoUser.id, id));
    });

    return () => {
      socket.off("mensajeNuevo");
    };
  }, [dispatch, infoUser, id]);

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [conversacion]);

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!contenido.trim()) return;

    const mensaje = {
      emisor_id: infoUser.id,
      receptor_id: id,
      contenido,
    };

    dispatch(sendMensaje(mensaje)).then(() => {
      setContenido("");
      socket.emit("sendMensaje", mensaje);
    });
  };

  useEffect(() => {
    if (infoUser?.id && id) {
      dispatch(marcarConversacionLeida(infoUser.id, id));
    }
  }, [dispatch, infoUser, id]);

  
  const handleEnviarUbicacion = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const enlaceMapa = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const mensaje = {
          emisor_id: infoUser.id,
          receptor_id: id,
          contenido: `📍 Mi ubicación: ${enlaceMapa}`,
        };

        dispatch(sendMensaje(mensaje)).then(() => {
          socket.emit("sendMensaje", mensaje);
        });
      },
      () => {
        alert("No se pudo obtener tu ubicación.");
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar(e);
    }
  };

  const onEmojiClick = (emojiData) => {
    setContenido((prev) => prev + emojiData.emoji);
  };

  const getEmbedUrl = (url) => {
    const match = url.match(/q=([-.\d]+),([-.\d]+)/);
    if (match) {
      const lat = match[1];
      const lng = match[2];
      return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    }
    return null;
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={mensajesRef}>
        {conversacion.map((msg) => {
          const isLocation = msg.contenido.includes("https://www.google.com/maps?q=");
          const embedUrl = isLocation ? getEmbedUrl(msg.contenido) : null;

          return (
            <div key={msg.id} className={msg.emisor_id === infoUser.id ? "msg-own" : "msg-other"}>
              {isLocation && embedUrl ? (
                <div className="msg-mapa">
                  <p>📍 Mi ubicación:</p>
                  <iframe
                    title="mapa"
                    src={embedUrl}
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: "12px" }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                  <a
                    href={msg.contenido}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-mapa"
                  >
                    Ver en pantalla completa
                  </a>
                </div>
              ) : (
                <span>{msg.contenido}</span>
              )}
            </div>
          );
        })}
      </div>

      {mostrarEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={onEmojiClick} height={300} />
        </div>
      )}

      <form onSubmit={handleEnviar} className="chat-form">
        <button
          type="button"
          className="emoji-btn"
          onClick={() => setMostrarEmojiPicker(!mostrarEmojiPicker)}
        >
          😊
        </button>
        <button
          type="button"
          className="ubicacion-btn"
          onClick={handleEnviarUbicacion}
        >
          📍
        </button>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje... (Shift+Enter para nueva línea)"
          rows={1}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
