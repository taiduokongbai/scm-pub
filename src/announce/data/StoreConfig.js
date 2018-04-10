import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from "../reducers";

let store = createStore(rootReducer, applyMiddleware(thunk));
let getData = (val) => store.getState()[val]


exports.store = store;
exports.getData = getData;