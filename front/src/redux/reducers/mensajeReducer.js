const initialState = {
    loading: false,
    error: null,
    mensajeEnviado: null,
    chatsRecientes: [],
    conversacion: [],
    mensajeLeido: null,
    noLeidos: 0,
};

const mensajeReducer = (state = initialState, action) => {
    switch (action.type) {
        // Enviar mensaje
        case "POST_MENSAJE_REQUEST":
            return { ...state, loading: true, error: null };
        case "SEND_MENSAJE_SUCCESS":
            return { ...state, loading: false, mensajeEnviado: action.payload };
        case "SEND_MENSAJE_FAIL":
            return { ...state, loading: false, error: action.payload };

        // Obtener chats recientes
        case "GET_CHATS_RECIENTES_REQUEST":
            return { ...state, loading: true, error: null };
        case "GET_CHATS_RECIENTES_SUCCESS":
            const totalNoLeidos = action.payload.reduce((acc, chat) => acc + (chat.noLeidos || 0), 0);
            return { ...state, loading: false, chatsRecientes: action.payload, noLeidos: totalNoLeidos };
        case "GET_CHATS_RECIENTES_FAIL":
            return { ...state, loading: false, error: action.payload };

        // Obtener conversación
        case "GET_CONVERSACION_REQUEST":
            return { ...state, loading: true, error: null };
        case "GET_CONVERSACION_SUCCESS":
            return { ...state, loading: false, conversacion: action.payload };
        case "GET_CONVERSACION_FAIL":
            return { ...state, loading: false, error: action.payload };

        // Marcar mensaje como leído
        case "MARCAR_MENSAJE_LEIDO_REQUEST":
            return { ...state, loading: true, error: null };
        case "MARCAR_MENSAJE_LEIDO_SUCCESS":
            return { ...state, loading: false, mensajeLeido: action.payload };
        case "MARCAR_MENSAJE_LEIDO_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default mensajeReducer;