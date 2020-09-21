import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { NotificationContainer } from "react-notifications";
import imagesTool from "./Store/reducers/imagesTool";
import selectedItem from "./Store/reducers/selectedItem";
import "react-notifications/lib/notifications.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { watchImages } from "./Store/reducers/imagesTool/saga";
import { watchSaveUpdateImage } from "./Store/reducers/selectedItem/saga";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  imagesTool,
  selectedItem,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchImages);
sagaMiddleware.run(watchSaveUpdateImage);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotificationContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
