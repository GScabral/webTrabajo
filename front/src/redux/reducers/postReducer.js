const initialState = {
    allPost: [],
    allComments: [],
    infoPost: [],
    postByUser: [],
    report:[],
    loading: false,
    error: null
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALLPOST_REQUEST":
        case "GET_COMMENTS_REQUEST":
        case "CREATE_COMMENT_REQUEST":
        case "GET_POST_REQUEST":
        case "GET_POSTBYUSER_REQUEST":
        case "DELETE_POST_REQUEST":
        case "REPORTPOST_REQUEST":

            return {
                ...state,
                loading: true,
                error: null
            };

        case "GET_ALLPOST_SUCCESS":
            return {
                ...state,
                loading: false,
                allPost: action.payload
            };

        case "GET_COMMENTS_SUCCESS":
            return {
                ...state,
                loading: false,
                allComments: action.payload
            };

        case "CREATE_COMMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                allComments: [...state.allComments, action.payload]
            };
        case "GET_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                infoPost: action.payload
            }
        case "GET_POSTBYUSER_SUCCESS":
            return {
                ...state,
                loading: false,
                postByUser: action.payload
            }
        case "REPORTPOST_SUCCESS":
            return {
                ...state,
                loading: false,
                report: action.payload
            }

        case "DELETE_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                allPost: state.posts.filter((post) => post.id !== action.payload),
            };

        case "GET_ALLPOST_FAIL":
        case "GET_COMMENTS_FAIL":
        case "CREATE_COMMENT_FAIL":
        case "GET_POST_FAIL":
        case "GET_POSTBYUSER_FAIL":
        case "DELETE_POST_FAIL":
        case "REPORTPOST_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default postReducer;
