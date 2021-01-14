export const ADD_PREST_SUCCESS = "ADD_PREST_SUCCESS"
export const FETCH_PREST_SUCCESS = "FETCH_PREST_SUCCESS"

export function addPrest(prest) {
    return {
        payload: prest, type: ADD_PREST_SUCCESS
    }
}

export const fetchPrest = () => dispatch => {
    fetch("http://localhost:8080/api/prestataire")
        .then(res => res.json())
        .then((result) => {
                dispatch({
                    type: FETCH_PREST_SUCCESS,
                    payload: result
                })
            },
            (error) => {

            }
        )
}