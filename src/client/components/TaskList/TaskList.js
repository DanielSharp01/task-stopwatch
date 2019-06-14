import React from "react";
import { connect } from "react-redux";
import NewTask from "../Task/NewTask";
import Task from "../Task/Task";
import { newTask, changeTask, stopTask, continueTask, addTagOnTask, changeTagOnTask } from "../../actions/tasks";
import "./TaskList.scss";

function TaskList({ tasks, onStart, onChange, onStop, onContinue, onAddTag, onChangeTag, onChangeTagColor }) {
  return (
    <main>
      <NewTask onStart={onStart} />
      <div className="task-list">
        <div className="scroll-area">
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
      </div>
    </main>
  );
}

const mapStateToProps = ({ days, tasks }) => ({
  tasks: days["2019-06-14"].tasks.map(id => tasks[id])
});

const mapDispatchToProps = dispatch => ({
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
