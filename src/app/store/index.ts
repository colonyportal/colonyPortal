// Core redux
import { Store, createStore as CreateStore } from "redux";

// DevEnv
import { composeWithDevTools } from "redux-devtools-extension";

// Middleware
import { applyMiddleware } from "redux";
import { History } from "history";
import { routerMiddleware } from "react-router-redux";
import { logger } from "app/middleware";
import thunk from "redux-thunk";

// Persistance
import { persistStore } from "redux-persist";

// Our reducer collection (persistance configs defined in reducers/index.ts)
import { reducer } from "app/reducers";

export function createStore(history: History, initialState?: any): Store<any> {

  // Apply middleware
  let middleware = applyMiddleware(logger, routerMiddleware(history), thunk);
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  // Create our store and persistor
  const store = CreateStore(reducer, initialState, middleware) as Store<any>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export function createPersistor(store: Store<any>) {
  return persistStore(store);
}
