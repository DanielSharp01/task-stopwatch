import objectUtils from "./utils/objectUtils";
import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./components/App/App";

const dev = process.env.NODE_ENV === "development";

objectUtils();

const logMW = store => next => {
  return action => {
    console.group(typeof action.type !== "undefined" ? action.type : "redux-thunk");
    console.log("Before", store.getState());
    console.log("Action", action);
    const retVal = next(action);
    console.log("After", store.getState());
    console.groupEnd();
    return retVal;
  };
};

const store = createStore(reducer, dev ? applyMiddleware(logMW, thunk) : applyMiddleware(thunk));
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
