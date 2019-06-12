import React from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import "./App.scss";
import Task from "../Task/Task";
import NewTask from "../Task/NewTask";

const mapStateToProps = ({ time }) => ({
  time
});

function App({ time }) {
  return (
    <React.Fragment>
      <Header />
      <NewTask />
      <div className="tasks">
        <Task stopped={true} text="Task #1" />
        <Task stopped={true} text="Task #2" />
        <Task stopped={true} text="Task #3" />
        <Task stopped={false} text="Task #4" />
      </div>
    </React.Fragment>
  );
}

export default connect(
  mapStateToProps,
  () => ({})
)(App);
