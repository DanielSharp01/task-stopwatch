import React from "react";
import { connect } from "react-redux";
import NewTask from "../Task/NewTask";
import Task from "../Task/Task";
import { newTask, changeTask, stopTask, continueTask, addTagOnTask, changeTagOnTask } from "../../actions/tasks";

function TaskList({ tasks, onStart, onChange, onStop, onContinue, onAddTag, onChangeTag, onChangeTagColor }) {
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
            onAddTag={(name, color) => onAddTag(task.id, name, color)}
            onChangeTag={(name, nextName) => onChangeTag(task.id, name, nextName)}
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
