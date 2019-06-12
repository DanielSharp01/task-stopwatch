import React from "react";
import { connect } from "react-redux";
import NewTask from "../Task/NewTask";
import Task from "../Task/Task";
import { newTask, changeTask, stopTask, continueTask } from "../../actions/tasks";

function TaskList({ tasks, onStart, onChange, onStop, onContinue }) {
  return (
    <React.Fragment>
      <NewTask onStart={name => onStart(name)} />
      <div className="tasks">
        {tasks.map(task => (
          <Task
            {...task}
            key={task.id}
            onChange={name => onChange(task.id, name)}
            onStop={() => onStop(task.id)}
            onContinue={() => onContinue(task.id)}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = ({ tasks }) => ({
  tasks
});

const mapDispatchToProps = dispatch => ({
  onStart: name => dispatch(newTask(name)),
  onChange: (id, name) => dispatch(changeTask(id, name)),
  onStop: id => dispatch(stopTask(id)),
  onContinue: id => dispatch(continueTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
