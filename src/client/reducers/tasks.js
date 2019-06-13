import { NEW_TASK, CHANGE_TASK, STOP_TASK, CONTINUE_TASK } from "../actions/tasks";

export default (state = [], action) => {
  let index, newTask;
  switch (action.type) {
    case NEW_TASK:
      newTask = { id: state.length, name: action.name, start: Date.now() };
      if (state.length > 0 && !state[state.length - 1].stop)
        return [...state.slice(0, -1), Object.assign({}, state[state.length - 1], { stop: Date.now() }), newTask];
      else return [...state, newTask];
    case CHANGE_TASK:
      index = state.findIndex(task => task.id === action.id);
      return [...state.slice(0, index), Object.assign({}, state[index], { name: action.name }), ...state.slice(index + 1)];
    case STOP_TASK:
      index = typeof action.id !== "undefined" ? state.findIndex(task => task.id === action.id) : state.length - 1;
      return [...state.slice(0, index), Object.assign({}, state[index], { stop: Date.now() }), ...state.slice(index + 1)];
    case CONTINUE_TASK:
      index = state.findIndex(task => task.id === action.id);
      newTask = { id: state.length, name: state[index].name, running: true, start: Date.now() };
      if (state.length > 0 && !state[state.length - 1].stop) {
        return [...state.slice(0, -1), Object.assign({}, state[state.length - 1], { stop: Date.now() }), newTask];
      } else return [...state, newTask];
    default:
      return state;
  }
};
