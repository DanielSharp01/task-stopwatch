import React from "react";
import Header from "../Header/Header";
import "./App.scss";
import TaskList from "../TaskList/TaskList";
import Sidenav from "../Sidenav/Sidenav";
import { formatTime, getDateParts } from "../../../utils/timeFormat";

export default function App({ match }) {
  return (
    <React.Fragment>
      <Header />
      <div className="wrapper">
        <Sidenav />
        <TaskList dateString={match.params.dateString || formatTime(getDateParts(Date.now()), "YYYY-MM-DD")} />
      </div>
    </React.Fragment>
  );
}
