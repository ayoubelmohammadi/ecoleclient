import axios from "axios";
import {ELEVE_BASE_URL} from "../../config/apiConfig";
import qs from "qs";
import {onError, onFetch} from "./actions";

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

        function onFetch(loading) {
            dispatch({type: LOADING_STATUS_CHANGED, payload: loading});
        }

        onFetch(true);
        try {
            const success = await axios.get(ELEVE_BASE_URL, {params: params});
            onFetch(false);
            return onSuccess(success.data);
        } catch (error) {
            onFetch(false);
            return onError(error);
        }
    }
}

export function deleteEleves(params, ids) {
    return async dispatch => {
        function onSuccess() {
            return dispatch(fetchEleves(params));
        }

        onFetch(true);
        try {
            await axios.delete(ELEVE_BASE_URL, {
                params: ids,
                paramsSerializer: ids => {
                    return qs.stringify(ids, {arrayFormat: 'repeat'})
                }
            });
            onFetch(false);
            return onSuccess();
        } catch (error) {
            onFetch(false);
            onSuccess();
            return onError(error);
        }
    }
}

export function saveEleve(data) {
    return async dispatch => {
        function onSuccess() {
            return 1
        }

        onFetch(true);
        try {
            const result = await axios.post(ELEVE_BASE_URL, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onFetch(false);
            return onSuccess(result.data);
        } catch (error) {
            onFetch(false);
            onSuccess();
            return onError(error);
        }
    }
}