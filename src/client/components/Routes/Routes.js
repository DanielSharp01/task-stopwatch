import React from "react";
import { Route } from "react-router";
import App from "../App/App";

export default function Routes() {
  return <Route path="/task-stopwatch/:dateString?" component={App} />;
}
