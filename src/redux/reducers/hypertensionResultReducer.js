const initialState = {
    result: "No classification result yet."
}
const hypertensionResult = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_HYPERTENSION_RESULT":
            return {
                ...state,
                result: action.result
            };
        default:
            return state;
    }
};

export default hypertensionResult;