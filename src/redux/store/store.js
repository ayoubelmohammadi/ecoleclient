import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {authReducer} from "../reducers/reducers.js";
import thunk from "redux-thunk";
import {eleveReducer} from "../reducers/eleveReducer";

export const initStore = {
    authentication: {
        token: null,
        email: null
    }
};
export const Reducer = combineReducers({
    authentication: authReducer,
    eleve: eleveReducer,
});
export const store = createStore(Reducer, initStore, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
