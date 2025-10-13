const initialState = {
    user: [],
    servicios: [],
    userById: {},
    infoLogin: {},
    isLoggedIn: false,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
    token: {},

    // ❤️ Estados para Likes
    likesByPost: {},       // { postId: totalLikes }
    userLikesStatus: {},   // { postId: true/false }
    likeByUser: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // 🔵 USERS
        case 'GET_ALL_USERS_REQUEST':
        case 'GETBYID_USER_REQUEST':
        case "UPDATE_USER_REQUEST":
        case "UPDATE_PASSWORD_REQUEST":
        case "RESET_PASSWORD_REQUEST":
        case "REQUEST_PASSWORD_RESET_START":
        case "GET_LIKES_BY_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'GET_ALL_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload
            };

        case 'GET_ALL_USERS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case 'GETBYID_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                userById: action.payload
            };

        case 'LOGIN_USER_SUCCESS':


            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload
            };

        case 'LOGINBYID_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                infoLogin: action.payload
            };

        case 'GET_ALL_SERVICIO_SUCCESS':
            return {
                ...state,
                servicios: action.payload
            };
        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                infoLogin: {
                    ...state.infoLogin,
                    ...action.payload.updatedUser // depende cómo respondas desde el backend
                },
                mensaje: action.payload.message
            };
        case "UPDATE_PASSWORD_SUCCESS":
            return { ...state, loading: false, message: action.payload };


        case "GET_LIKES_BY_USER_SUCCESS":
            return {
                ...state,
                likesByPost: {
                    ...state.likesByPost,
                    [action.payload.postId]: action.payload.likes,
                },
            };
        // ❤️ LIKES
        case 'ADD_LIKE_REQUEST':
        case 'REMOVE_LIKE_REQUEST':
        case 'GET_LIKES_BY_POST_REQUEST':
        case 'CHECK_USER_LIKE_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'ADD_LIKE_SUCCESS':
        case 'REMOVE_LIKE_SUCCESS':
            return {
                ...state,
                loading: false
            };

        case 'GET_LIKES_BY_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                likesByPost: {
                    ...state.likesByPost,
                    [action.payload.postId]: action.payload.totalLikes
                }
            };

        case 'CHECK_USER_LIKE_SUCCESS':
            return {
                ...state,
                loading: false,
                userLikesStatus: {
                    ...state.userLikesStatus,
                    [action.meta.postId]: action.payload
                }
            };

        case "RESET_PASSWORD_SUCCESS":
            return { ...state, loading: false, success: true, message: action.payload };

        case "REQUEST_PASSWORD_RESET_SUCCESS":
            return { loading: false, message: action.payload, error: null };



        case "LOGOUT":
            return {
                ...state,
                user: [],
                servicios: [],
                userById: {},
                infoLogin: {},
                isLoggedIn: false,
                loading: false,
                error: null,
                isAuthenticated: false,
                token: null,
                likesByPost: {},
                userLikesStatus: {}
            };


        case 'ADD_LIKE_FAIL':
        case 'REMOVE_LIKE_FAIL':
        case 'GET_LIKES_BY_POST_FAIL':
        case 'CHECK_USER_LIKE_FAIL':
        case "UPDATE_USER_FAILURE":
        case "UPDATE_PASSWORD_FAILURE":
        case "RESET_PASSWORD_FAIL":
        case "REQUEST_PASSWORD_RESET_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default userReducer;
