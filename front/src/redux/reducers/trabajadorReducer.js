const initialState = {
    calificaciones: [],
    loading: false,
    error: null,
};

const trabajadorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CALIFICASION_REQUEST':
        case 'CREATE_CALIFICAR_REQUEST':
            return { ...state, loading: true };
        case 'GET_CALIFICASION_SUCCESS':
            return { ...state, loading: false, calificaciones: action.payload };
        case 'CREATE_CALIFICAR_SUCCESS':
            return {
                ...state,
                loading: false,
                calificaciones: [...state.calificaciones, action.payload] // o vuelve a llamar a getCalificacion
            };
        case 'GET_CALIFICASION_FAIL':
        case 'CREATE_CALIFICAR_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};



export default trabajadorReducer;