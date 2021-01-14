import {ADD_PREST_SUCCESS, FETCH_PREST_SUCCESS} from "../actions/prestActions";

const initPrest = {
    max: 500,
    list: []
}

export const prestRuducer = (state = initPrest, action) => {
    switch (action.type) {
        case FETCH_PREST_SUCCESS:
            return {
                ...state,
                list: action.payload
            }
        case ADD_PREST_SUCCESS:
            return {
                ...state,
                prestataires: [...state.prestataires,
                    {...action.payload, id: {...state.max}, contrats: []}
                ],
                max: {...state}.max + 1

            }
        default:
            return state;
    }
};