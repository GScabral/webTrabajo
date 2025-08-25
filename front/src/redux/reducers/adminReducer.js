const initialState = {
    admins: [],
    allComent: [],
    allUserAdmin: [],
    stats: [],
    loading: false,
    error: null,
    successMessage: null, // 🔹 nuevo campo para guardar mensajes de éxito
    reportes: [], // 🔹 nuevo array para guardar los reportes
    reportsByPost: []


}



const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADMINCOMMENT_GET_REQUEST':
        case "GET_ALLUSERADMIN_REQUEST":
        case "BAN_USER_REQUEST":
        case "DELETECOMMENT_REQUEST":
        case "UNBAN_USER_REQUEST":
        case "GET_STATS_REQUEST":
        case "GET_REPORTBYPOST_REQUEST":
        case "GET_ALLREPORTPOST_REQUEST":

            return {
                ...state,
                loading: true
            }
        case 'GET_ALLUSERADMIN_SUCCES':
            return {
                ...state,
                loading: false,
                allUserAdmin: action.payload
            }
        case 'GET_ALLREPORTPOST_SUCCES':
            return {
                ...state,
                loading: false,
                reportes: action.payload
            }
        case "GET_STATS_SUCESS":
            return {
                ...state,
                loading: false,
                stats: action.payload
            }
        case 'ADMINCOMMENT_SUCCES':
            return {
                ...state,
                loading: false,
                allComent: action.payload
            }
        case "BAN_USER_SUCESS":
            return {
                ...state,
                loading: false,
                successMessage: action.payload,
            }

        case "UNBAN_USER_SUCESS":
            return {
                ...state,
                loading: false,
                successMessage: action.payload,
            };
        case "DELETECOMMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                allComent: state.allComent.filter(
                    (comment) => comment.id !== action.payload.id
                ), // ⬅️ eliminamos el comentario del estado
            };
        case "GET_REPORTBYPOST_SUCCESS": // 🔹 nuevo
            return {
                ...state,
                loading: false,
                reportsByPost: action.payload
            };

        case "GET_REPORTBYPOST_FAIL": // 🔹 nuevo
        case 'ADMINCOMMENT_FAIL':
        case "GET_ALLUSERADMIN_FAIL":
        case "BAN_USER_FAIL":
        case "DELETECOMMENT_FAIL":
        case "UNBAN_USER_FAIL":
        case "GET_ALLREPORTPOST_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

}


export default adminReducer;

