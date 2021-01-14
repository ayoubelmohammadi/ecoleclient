import axios from "axios";
import {ELEVE_BASE_URL} from "../../config/apiConfig";

export const FETCH_ELEVE_SUCCESS = "FETCH_ELEVE_SUCCESS";
export const ERROR_GENERATED = "ERROR_GENERATED";
export const LOADING_STATUS_CHANGED = "LOADING_STATUS_CHANGED";

export function fetchEleves(params) {
    return async dispatch => {

        function onSuccess(success) {
            dispatch({type: FETCH_ELEVE_SUCCESS, payload: success});
            return success;
        }

        function onError(error) {
            dispatch({type: ERROR_GENERATED, error});
            return error;
        }

        function onDone(loading) {
            dispatch({type: LOADING_STATUS_CHANGED, payload: loading});
        }

        onDone(true);
        try {
            const success = await axios.get(ELEVE_BASE_URL, params);
            onDone(false);
            return onSuccess(success);
        } catch (error) {
            onDone(false);
            return onError(error);
        }
    }
}