const initialState = {
    list: [],
};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_NOTIFICATIONS":
            return { ...state, list: action.payload };

        case "MARK_AS_READ":
            return {
                ...state,
                list: state.list.map((n) =>
                    n.id === action.payload.id ? { ...n, read_at: action.payload.read_at } : n
                ),
            };

        case "MARK_ALL_AS_READ":
            return {
                ...state,
                list: state.list.map((n) => ({ ...n, read_at: new Date().toISOString() })),
            };

        default:
            return state;
    }
}