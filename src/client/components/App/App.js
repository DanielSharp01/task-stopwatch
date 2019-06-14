import React from "react";
import Header from "../Header/Header";
import "./App.scss";
import TaskList from "../TaskList/TaskList";
import Sidenav from "../Sidenav/Sidenav";

export default function App({ time }) {
  return (
    <React.Fragment>
      <Header />
      <div className="wrapper">
        <Sidenav />
        <TaskList />
      </div>
    </React.Fragment>
  );
}
