import { combineReducers } from 'redux';

import hypertensionResult from './hypertensionResultReducer';
import kidneyDiseaseResult from './kidneyDiseaseResultReducer';

export default combineReducers({
    hypertensionResult,
    kidneyDiseaseResult
});