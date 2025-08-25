import axios from "axios";


export const getAllPost = () => async (dispatch) => {
    dispatch({ type: "GET_ALLPOST_REQUEST" });

    try {
        const response = await axios.get("http://localhost:3001/posts/getAllPost")
        dispatch({
            type: "GET_ALLPOST_SUCCESS",
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: "GET_ALLPOST_FAIL"
        })
    }
}

export const createPost = (postData) => async (dispatch) => {
    dispatch({ type: 'CREATE_POST_REQUEST' });
    try {
        const response = await axios.post('http://localhost:3001/posts/postear', postData);
        dispatch({
            type: 'CREATE_POST_SUCCESS',
            payload: response.data.post
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_POST_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};

export const getCommentsByPost = (postId) => async (dispatch) => {
    dispatch({ type: 'GET_COMMENTS_REQUEST' });

    try {
        const response = await axios.get(`http://localhost:3001/posts/post/${postId}`);
        dispatch({
            type: 'GET_COMMENTS_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_COMMENTS_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};

export const getByPostUser = (userId) => async (dispatch) => {
    dispatch({ type: 'GET_POSTBYUSER_REQUEST' });

    console.log(userId)
    try {
        const response = await axios.get(`http://localhost:3001/posts/getAllPostUser/${userId}`);
        dispatch({
            type: 'GET_POSTBYUSER_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_POSTBYUSER_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};






export const getPostById = (postId) => async (dispatch) => {
    dispatch({ type: 'GET_POST_REQUEST' });
    if (!postId) {
        return dispatch({
            type: 'GET_POST_FAIL',
            payload: 'ID de post no proporcionado'
        });
    }
    try {
        const response = await axios.get(`http://localhost:3001/posts/postById/${postId}`);
        dispatch({
            type: 'GET_POST_SUCCESS',
            payload: response.data
        });
        return response.data; // opcional
    } catch (error) {
        dispatch({
            type: 'GET_POST_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};

export const createComment = (commentData) => async (dispatch) => {
    dispatch({ type: 'CREATE_COMMENT_REQUEST' });
    try {
        const response = await axios.post('http://localhost:3001/posts/comentar', commentData);
        dispatch({
            type: 'CREATE_COMMENT_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_COMMENT_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};


export const deletePost = (postId) => async (dispatch, getState) => {
    dispatch({ type: "DELETE_POST_REQUEST" });

    try {
        const token = localStorage.getItem("token");
        console.log(token)
        console.log(postId)
        const response = await axios.delete(
            `http://localhost:3001/posts/delete/${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // devolvemos el id borrado, así el reducer actualiza el array
        dispatch({
            type: "DELETE_POST_SUCCESS",
            payload: postId,
        });
    } catch (error) {
        dispatch({
            type: "DELETE_POST_FAIL",
            payload: error.response?.data?.error || "Error al eliminar post",
        });
    }
};

//proobar 
export const reportarPost = ({ post_id, user_id, motivo }) => async (dispatch) => {
    dispatch({ type: "REPORTPOST_REQUEST" })


    console.log(post_id, motivo, user_id)
    try {
        const response = await axios.post("http://localhost:3001/posts/reportPost", {
            post_id,
            user_id,
            motivo
        });
        dispatch({
            type: 'REPORTPOST_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'REPORTPOST_FAIL',
            payload: error.response?.data?.error || error.message
        });
    }
};
