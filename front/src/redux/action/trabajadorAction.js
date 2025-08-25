import axios from "axios"
import API from "../../Api/axios";



export const createCalificacion = (postData) => async (dispatch) => {
    dispatch({ type: 'CREATE_CALIFICAR_REQUEST' });
    try {
        const response = await API.post('/trabajador/calificaciones', postData);
        dispatch({
            type: 'CREATE_CALIFICAR_SUCCESS',
            payload: response.data.post
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_CALIFICAR_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};

export const getCalificacion = (trabajador_id) => async (dispatch) => {
    dispatch({ type: 'GET_CALIFICASION_REQUEST' });

    try {
        const response = await API.get(`/trabajador/calificaciones/${trabajador_id}`);
        dispatch({
            type: 'GET_CALIFICASION_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_CALIFICASION_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};
