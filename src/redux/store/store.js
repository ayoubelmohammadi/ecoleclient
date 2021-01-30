import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {authReducer} from "../reducers/reducers.js";
import thunk from "redux-thunk";
import {eleveReducer} from "../reducers/eleveReducer";
import {tuteurReducer} from "../reducers/tuteurReducer";

export const initStore = {
    authentication: {
        token: null,
        email: null
    }
};
export const Reducer = combineReducers({
    authentication: authReducer,
    eleves: eleveReducer,
    tuteurs: tuteurReducer
});
export const store = createStore(Reducer, initStore, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
