export const LOADING_RUBRIC_SUCCESS = "LOADING_RUBRIC_SUCCESS";
export const LOADING_RUBRIC_FAIL = "LOADING_RUBRIC_FAIL";
export const RUBRIC_TYPE_CHANGED = "RUBRIC_TYPE_CHANGED";
export const YEAR_CHANGED = "YEAR_CHANGED";
export const YEAR_ADD_SUCCESS = "YEAR_ADD_SUCCESS";
export const LOADING_YEARS_SUCCESS = "LOADING_YEARS_SUCCESS";

export const changeType = (type) => ({
    type: RUBRIC_TYPE_CHANGED,
    payload: type
})
export const changeYear = (year) => ({
    type: YEAR_CHANGED,
    payload: year
})

export const updateRubric = (rubric) => dispatch => {
    fetch("http://localhost:8080/api/rubric/" + rubric.id,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: rubric.name,
                credit: rubric.totalCredit,
                rest: rubric.totalRest
            })
        })
        .then(res => dispatch(fetchRubric(rubric.year)))
        .then((result) => {

        }, (error) => {
            //
        })
}
export const addRubric = (rubric) => dispatch => {
    fetch("http://localhost:8080/api/rubric/",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubric)
        })
        .then(res => res.json())
        .then((result) => {
            dispatch(fetchRubric(rubric.year));
        }, (error) => {
            //
        })
}
export const deleteRubric = (id, year) => dispatch => {
    fetch("http://localhost:8080/api/rubric/" + id, {
        method: 'DELETE'
    }).then(res => {
    }).then((result) => {
            dispatch(fetchRubric(year));
        },
        (error) => {
            //
        }
    )
}
export const fetchRubric = (year) => dispatch => {
    fetch("http://localhost:8080/api/year/" + year + "/rubrics")
        .then(res => res.json())
        .then((result) => {
                dispatch({
                    type: LOADING_RUBRIC_SUCCESS,
                    payload: result
                })
            },
            (error) => {
                dispatch({
                    type: LOADING_RUBRIC_FAIL,
                    payload: error
                })
            }
        )
}


export const addYear = (year) => dispatch => {
    fetch("http://localhost:8080/api/year/" + year,
        {
            method: 'POST'
        })
        .then(res => res.json())
        .then((result) => {
            dispatch({
                type: YEAR_ADD_SUCCESS,
                payload: {
                    year: year,
                    rubrics: result
                }
            });
        }, (error) => {
            //
        })
}
export const fetchYears = () => dispatch => {
    fetch("http://localhost:8080/api/year")
        .then(res => res.json())
        .then((result) => {
                dispatch({
                    type: LOADING_YEARS_SUCCESS,
                    payload: result
                })
            },
            (error) => {

            }
        )
}