import {ERROR_GENERATED, FETCH_ELEVE_SUCCESS, LOADING_STATUS_CHANGED} from "../actions/eleveActions";

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
    },
    fetching: false
}

export const eleveReducer = (state = initState, action) => {
    switch (action.type) {
        case LOADING_STATUS_CHANGED:
            return {
                ...state,
                fetching: action.payload
            };
        case FETCH_ELEVE_SUCCESS:
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