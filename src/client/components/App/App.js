import React from "react";
import Header from "../Header/Header";
import "./App.scss";
import TaskList from "../TaskList/TaskList";

export default function App({ time }) {
  return (
    <React.Fragment>
      <Header />
      <TaskList />
    </React.Fragment>
  );
}
