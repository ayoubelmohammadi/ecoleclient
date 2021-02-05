import axios from "axios";
import {YEAR_BASE_URL} from "../../config/apiConfig";
import {ERROR_GENERATED, LOADING_STATUS_CHANGED} from "./eleveActions";
import qs from "qs";
import {onError, onFetch} from "./actions";

export const FETCH_YEAR_SUCCESS = "FETCH_YEAR_SUCCESS"
export const DELETE_YEAR_SUCCESS = "DELETE_YEAR_SUCCESS"

export function fetchYears(params) {
    return async dispatch => {
        function onSuccess(success) {
            dispatch({type: FETCH_YEAR_SUCCESS, payload: success});
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
            const success = await axios.get(YEAR_BASE_URL, {params: params});
            onFetch(false);
            return onSuccess(success.data);
        } catch (error) {
            onFetch(false);
            return onError(error);
        }
    }
}

export function deleteYears(ids) {
    return async dispatch => {
        function onSuccess() {
            return dispatch({
                type: DELETE_YEAR_SUCCESS,
                payload: ids
            });
        }
        onFetch(true);
        try {
            await axios.delete(YEAR_BASE_URL, {
                params: {ids: ids},
                paramsSerializer: ids => {
                    return qs.stringify(ids, {arrayFormat: 'repeat'})
                }
            });
            onFetch(false);
            return onSuccess();
        }
        catch (error) {
            onFetch(false);
            return onError(error);
        }
    }
}