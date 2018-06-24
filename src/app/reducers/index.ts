import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { colonyReducer } from "./colony";
import { githubReducer } from "./github"

export const rootReducer = combineReducers({
  router: routerReducer,
  colony: colonyReducer,
  github: githubReducer
});
