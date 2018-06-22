import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import { colonyReducer } from "./colony";
const colonyPersistConfig = {
  key: 'colony',
  storage: storage,
  whitelist: [ ] // store entry names you want persisted, for instance 'addresses'
};

import { loginReducer } from './login';
const loginPersistConfig = {
  key: 'login',
  storage: storage,
  whitelist: [ ] // store entry names
};

import { githubReducer } from "./github";
const githubPersistConfig = {
  key: 'github',
  storage: storage,
  whitelist: [ ] // store entry names
}

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [ 'routing' ]
}

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
const rootReducer = combineReducers({
  colony: persistReducer(colonyPersistConfig, colonyReducer),
  login: persistReducer(loginPersistConfig, loginReducer),
  github: persistReducer(githubPersistConfig, githubReducer),
  routing: routerReducer
});

export const reducer = persistReducer(rootPersistConfig, rootReducer);
