import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postContact } from "../../redux/action/trabajadorAction";
import "./ContactModal.css";

const ContactModal = ({ open, onClose, profileId, requesterId }) => {
    const dispatch = useDispatch();
    const [method, setMethod] = useState("in-app"); // 'in-app', 'whatsapp', 'email', ...
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profileId || !requesterId) return; // validación mínima

        setSending(true);
        const metadata = { message }; // puedes ampliar metadata con más campos
        await dispatch(postContact(profileId, requesterId, method, metadata));
        setSending(false);
        setMessage("");
        onClose();
    };

    return (
        <div className="contact-modal-backdrop" onClick={onClose}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                <header className="contact-modal-header">
                    <h3>Contactar al trabajador</h3>
                    <button className="close-btn" onClick={onClose}>✖</button>
                </header>

                <form className="contact-modal-form" onSubmit={handleSubmit}>
                    <label>
                        Método:
                        <select value={method} onChange={(e) => setMethod(e.target.value)}>
                            <option value="in-app">Mensaje en la app</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="email">Email</option>
                        </select>
                    </label>

                    <label>
                        Mensaje:
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            required
                        />
                    </label>

                    <div className="contact-modal-actions">
                        <button type="button" className="btn cancelar" onClick={onClose} disabled={sending}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn guardar" disabled={sending}>
                            {sending ? "Enviando..." : "Enviar solicitud"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;