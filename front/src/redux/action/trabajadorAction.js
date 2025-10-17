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


export const postView = (profile_id, viewer_id, viewer_ip, user_agent) => async (dispatch) => {
    dispatch({ type: "POST_NEWVIEW_REQUEST" });

    console.log("lo que se esta mandando:", profile_id, viewer_id, viewer_ip, user_agent)
    try {
        const response = await API.post(`/trabajador/views`, {
            profile_id,
            viewer_id,
            viewer_ip,
            user_agent,
        });

        dispatch({
            type: "POST_NEWVIEW_SUCCESS",
            payload: response.data.message,
        });
    } catch (error) {
        dispatch({
            type: "POST_NEWVIEW_FAIL",
            payload: error.response?.data?.error || error.message,
        });
    }
};

export const postContact = (profile_id, requester_id, method, metadata) => async (dispatch) => {
    dispatch({ type: "POST_NEWVIEW_REQUEST" });

    console.log("lo que se esta mandando:", profile_id, requester_id, method, metadata)
    try {
        const response = await API.post(`/trabajador/addContact`, {
            profile_id,
            requester_id,
            method,
            metadata,
        });

        dispatch({
            type: "POST_NEWVIEW_SUCCESS",
            payload: response.data.message,
        });
    } catch (error) {
        dispatch({
            type: "POST_NEWVIEW_FAIL",
            payload: error.response?.data?.error || error.message,
        });
    }
};


export const totalContactos = (trabajador_id) => async (dispatch) => {
    dispatch({ type: 'GET_CONTACTOSTOTAL_REQUEST' })

    try {
        const response = await API.get(`/trabajador/contacts/${trabajador_id}`);
        dispatch({
            type: 'GET_CONTACTOSTOTAL_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_CONTACTOSTOTAL_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};

export const allStats = (trabajador_id) => async (dispatch) => {
    dispatch({ type: 'GET_ALLSTATSTRABAJO_REQUEST' })
    try {
        const response = await API.get(`/trabajador/stats/${trabajador_id}`);
        dispatch({
            type: 'GET_ALLSTATSTRABAJO_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_ALLSTATSTRABAJO_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};

