const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFecthing: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFecthing: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFecthing: false,
                error: true,
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFecthing: false,
                error: false,
            };
        default:
            return state;
    }
};

export default Reducer;