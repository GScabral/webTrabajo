const initialState = {
    allBadges: [],
    loading: false,
    error: null
}


const badgesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BADGES_REQUEST":

            return {
                ...state,
                loading: true,
                error: null
            };

        case "GET_BADGES_SUCCESS":
            return {
                ...state,
                loading: false,
                allBadges: action.payload
            }
        case "GET_BADGES_FAIL":
            return {
                ...state,
                loading: false,
                erro: action.payload
            };
        default:
            return state;
    }
}



export default badgesReducer;