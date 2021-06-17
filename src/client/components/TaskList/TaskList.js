import React, { Component } from "react";
import { connect } from "react-redux";
import NewTask from "../Task/NewTask";
import Task from "../Task/Task";
import { fetchTasks, newTask, changeTask, stopTask, continueTask, addTagOnTask, changeTagOnTask } from "../../actions/tasks";
import "./TaskList.scss";
import Modules from "../Modules/Modules";
import { formatTime, getDateParts } from "../../../utils/timeFormat";

class TaskList extends Component {
  componentDidUpdate() {
    if (!this.props.loaded) {
      this.props.fetchTasks();
    }
  }
  render() {
    const { tasks, onStart, onChange, onStop, onContinue, onAddTag, onChangeTag, readOnly, dateString } = this.props;
    return (
      <main>
        {<NewTask hidden={readOnly} onStart={onStart} />}
        <Modules dateString={dateString} />
        <div className="task-list">
          <div className="scroll-area">
            {tasks.map(task => (
              <Task
                {...task}
                readOnly={readOnly}
                key={task.id}
                onChange={name => onChange(!task.saved ? null : task.id, name)}
                onStop={() => onStop(!task.saved ? null : task.id)}
                onContinue={() => onContinue(!task.saved ? null : task.id)}
                onAddTag={(name, color) => onAddTag(!task.saved ? null : task.id, name, color)}
                onChangeTag={(name, nextName) => onChangeTag(!task.saved ? null : task.id, name, nextName)}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ days, tasks }, { dateString }) => {
  const todayDateString = formatTime(getDateParts(Date.now()), "YYYY-MM-DD");
  console.log(dateString, todayDateString);
  return {
    tasks: days[dateString]?.loaded ? days[dateString].tasks.filter(id => !tasks[id].disabled).map(id => tasks[id]) : [],
    loaded: days[dateString]?.loaded,
    readOnly: dateString !== todayDateString
  };
};

const mapDispatchToProps = (dispatch, { dateString }) => ({
  fetchTasks: () => dispatch(fetchTasks(dateString)),
  onStart: (name, tags) => dispatch(newTask(name, tags)),
  onChange: (id, name) => dispatch(changeTask(id, name)),
  onStop: id => dispatch(stopTask(id)),
  onContinue: id => dispatch(continueTask(id)),
  onContinue: id => dispatch(continueTask(id)),
  onContinue: id => dispatch(continueTask(id)),
  onAddTag: (id, name, color) => dispatch(addTagOnTask(id, name, color)),
  onChangeTag: (id, name, nextName) => dispatch(changeTagOnTask(id, name, nextName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
