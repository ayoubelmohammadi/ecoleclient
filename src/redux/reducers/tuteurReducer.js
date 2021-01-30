import {ERROR_GENERATED} from "../actions/eleveActions";
import {FETCH_TUTEUR_SUCCESS} from "../actions/tuteurActions";

const initState = {
    page: {
        "content": [],
        "pageable": {
            "sort": {
                "sorted": true,
                "unsorted": false,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 10,
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "first": true,
        "last": true,
        "totalPages": 0,
        "totalElements": 0,
        "numberOfElements": 0,
        "size": 10,
        "number": 0,
        "empty": true,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        }
    }
}

export const tuteurReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_TUTEUR_SUCCESS :
            return {
                ...state,
                page: action.payload
            };
        case ERROR_GENERATED:
            return state;
        default:
            return state;
    }
};