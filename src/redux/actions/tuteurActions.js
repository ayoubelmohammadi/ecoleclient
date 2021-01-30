import axios from "axios";
import {TUTEUR_BASE_URL} from "../../config/apiConfig";
import {ERROR_GENERATED, LOADING_STATUS_CHANGED} from "./eleveActions";

export const FETCH_TUTEUR_SUCCESS = "FETCH_TUTEUR_SUCCESS";

export function fetchTuteurs(params) {
    return async dispatch => {
        function onSuccess(success) {
            dispatch({type: FETCH_TUTEUR_SUCCESS, payload: success});
            return success;
        }

        function onError(error) {
            dispatch({type: ERROR_GENERATED, payload: error});
            return error;
        }

        function onFetch(loading) {
            dispatch({type: LOADING_STATUS_CHANGED, payload: loading});
        }

        onFetch(true);
        try {
            const success = await axios.get(TUTEUR_BASE_URL, {params: params});
            onFetch(false);
            return onSuccess(success.data);
        } catch (error) {
            onFetch(false);
            return onError(error);
        }
    }
}