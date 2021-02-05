import {DELETE_YEAR_SUCCESS, FETCH_YEAR_SUCCESS} from "../actions/schoolActions";

const initState = {
    years: {
        list: [],
        current: null
    },
    levels: {
        list: [],
        current: null
    }
}
export const schoolReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_YEAR_SUCCESS :
            return {
                ...state,
                years: {
                    list: action.payload,
                    current: action.payload[-1]
                }
            }
        case DELETE_YEAR_SUCCESS:
            return {
                ...state,
                years: {
                    list: [...state.years.list.filter(o => !(action.payload.includes(o.id)))]
                }
            }
        default:
            return state
    }
}