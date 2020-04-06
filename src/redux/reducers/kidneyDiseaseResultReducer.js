const initialState = {
    output: {
        result: "No classification result yet.",
        dropReadings: []
    }
}
const kidneyDiseaseResult = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_KIDNEY_DISEASE_RESULT":
            return {
                ...state,
                output: action.output
            };
        default:
            return state;
    }
};

export default kidneyDiseaseResult;