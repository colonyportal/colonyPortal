import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { colonyReducer } from "./colony";
import { loginReducer } from './login';

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers({
  router: routerReducer as any,
  colony: colonyReducer as any,
  login: loginReducer as any,
});
