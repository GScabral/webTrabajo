import API from "../../Api/axios";


export const getAllBadges = () => async (dispatch) => {
    dispatch({ type: "GET_BADGES_REQUEST" });


    try {
        const response = await API.get("/badges/getBadges")
        dispatch({
            type: "GET_BADGES_SUCCESS",
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: "GET_BADGES_FAIL"
        })
    }
}