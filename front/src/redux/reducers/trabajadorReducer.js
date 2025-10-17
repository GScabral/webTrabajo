const initialState = {
    calificaciones: [],
    allStats: null,      // estadísticas del trabajador (vistas, contactos, etc.)
    totalContactos: 0,   // total de contactos
    loading: false,
    error: null,
};

const trabajadorReducer = (state = initialState, action) => {
    switch (action.type) {

        // -------------------------------
        // CALIFICACIONES
        // -------------------------------
        case "GET_CALIFICASION_REQUEST":
        case "CREATE_CALIFICAR_REQUEST":
        case "GET_ALLSTATSTRABAJO_REQUEST":
        case "GET_CONTACTOSTOTAL_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "GET_CALIFICASION_SUCCESS":
            return {
                ...state,
                loading: false,
                calificaciones: action.payload,
            };

        case "CREATE_CALIFICAR_SUCCESS":
            return {
                ...state,
                loading: false,
                calificaciones: [...state.calificaciones, action.payload],
            };

        // -------------------------------
        // ESTADÍSTICAS
        // -------------------------------
        case "GET_ALLSTATSTRABAJO_SUCCESS":
            return {
                ...state,
                loading: false,
                allStats: action.payload, // guarda el objeto tal cual llega del backend
            };

        // -------------------------------
        // CONTACTOS TOTALES
        // -------------------------------
        case "GET_CONTACTOSTOTAL_SUCCESS":
            return {
                ...state,
                loading: false,
                totalContactos: action.payload, // guarda el total recibido
            };

        // -------------------------------
        // ERRORES
        // -------------------------------
        case "GET_CALIFICASION_FAIL":
        case "CREATE_CALIFICAR_FAIL":
        case "GET_ALLSTATSTRABAJO_FAIL":
        case "GET_CONTACTOSTOTAL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default trabajadorReducer;
