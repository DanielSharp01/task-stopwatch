import objectUtils from "../utils/objectUtils";
import React from "react";
import { hydrate } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes/Routes";

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

const store = createStore(reducer, window.__INITIAL_STATE__, dev ? applyMiddleware(logMW, thunk) : applyMiddleware(thunk));
hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
