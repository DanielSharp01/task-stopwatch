import { NEW_TASK, CHANGE_TASK, STOP_TASK, CONTINUE_TASK } from "../actions/tasks";
import { TIMER } from "../actions";

export default (state = [], action) => {
  let index, newTask;
  switch (action.type) {
    case TIMER:
      let now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0 && state.length > 0 && state[state.length - 1].running) {
        let midnight = new Date(now);
        midnight.setHours(0, 0, 0, 0);
        return [...state.slice(0, -1), Object.assign({}, state[state.length - 1], { running: false, stop: midnight.getTime() })];
      }

      return state;
    case NEW_TASK:
      newTask = { id: state.length, name: action.name, running: true, start: Date.now() };
      if (state.length > 0 && state[state.length - 1].running)
        return [...state.slice(0, -1), Object.assign({}, state[state.length - 1], { running: false, stop: Date.now() }), newTask];
      else return [...state, newTask];
    case CHANGE_TASK:
      index = state.findIndex(task => task.id === action.id);
      return [...state.slice(0, index), Object.assign({}, state[index], { name: action.name }), ...state.slice(index + 1)];
    case STOP_TASK:
      index = state.findIndex(task => task.id === action.id);
      return [...state.slice(0, index), Object.assign({}, state[index], { running: false, stop: Date.now() }), ...state.slice(index + 1)];
    case CONTINUE_TASK:
      index = state.findIndex(task => task.id === action.id);
      newTask = { id: state.length, name: state[index].name, running: true, start: Date.now() };
      if (state.length > 0 && state[state.length - 1].running)
        return [...state.slice(0, -1), Object.assign({}, state[state.length - 1], { running: false, stop: Date.now() }), newTask];
      else return [...state, newTask];
    default:
      return state;
  }
};
