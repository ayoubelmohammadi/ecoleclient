import {
    LOADING_RUBRIC_SUCCESS, LOADING_YEARS_SUCCESS, RUBRIC_TYPE_CHANGED, YEAR_ADD_SUCCESS, YEAR_CHANGED,
} from "../actions/budgetActions";

export const RubricType = {
    INVESTISSEMENT: "INVESTISSEMENT",
    FONCTIONNENT: "FONCTIONNENT",
    RESOURCE: "RESOURCE"
}
const initBudget = {
    year: 2020,
    rubricType: RubricType.INVESTISSEMENT,
    fullList: [],
    list: [],
    years: [2020]
};
export const budgetReducer = (state = initBudget, action) => {
    switch (action.type) {
        case YEAR_ADD_SUCCESS:
            return {
                ...state,
                years: [...state.years, action.payload.year],
                year: action.payload.year
            }
        case LOADING_YEARS_SUCCESS:
            return {
                ...state,
                years: action.payload,
                year: action.payload.slice(-1).pop()
            }
        case YEAR_CHANGED:
            return {
                ...state,
                year: action.payload
            }
        case RUBRIC_TYPE_CHANGED: {
            return {
                ...state,
                rubricType: action.payload,
                list: {...state}.fullList.filter(o => o.rubricType === action.payload)
            }
        }
        case LOADING_RUBRIC_SUCCESS:
            return {
                ...state,
                fullList: action.payload,
                list: action.payload.filter(o => o.rubricType === {...state}.rubricType)
            }
        default:
            return state;
    }
};
