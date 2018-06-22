import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConnectedRouter } from "react-router-redux";

import { createBrowserHistory } from "history";
import { createStore, createPersistor } from "app/store";

import { App } from "./app";
import Loading from "components/presentation/Loading"

// prepare store
const history = createBrowserHistory();
const store = createStore(history);
const persistor = createPersistor(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
