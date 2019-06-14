import { NEW_TASK, CHANGE_TASK, STOP_TASK, CONTINUE_TASK, ADD_TAG_ON_TASK, CHANGE_TAG_ON_TASK } from "../actions/tasks";

export default (state = [], action, newTags) => {
  let index, newTask;
  switch (action.type) {
    case NEW_TASK:
      newTask = { id: state.length, name: action.name, start: Date.now(), tags: [...newTags] };
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
      newTask = { id: state.length, name: state[index].name, running: true, start: Date.now(), tags: [...state[index].tags] };
      if (state.length > 0 && !state[state.length - 1].stop) {
        return [...state.slice(0, -1), Object.assign({}, state[state.length - 1], { stop: Date.now() }), newTask];
      } else return [...state, newTask];
    case ADD_TAG_ON_TASK:
      index = state.findIndex(task => task.id === action.id);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], { tags: [...state[index].tags, action.name] }),
        ...state.slice(index + 1)
      ];
    case CHANGE_TAG_ON_TASK:
      index = state.findIndex(task => task.id === action.id);
      let nextTags = tags;
      if (action.name !== action.nextName && action.nextName.trim().length > 0) {
        let tagIndex = state.findIndex(tag => tag === action.name);
        nextTags = [...nextTags.slice(0, tagIndex), action.nextName, ...nextTags.slice(tagIndex + 1)];
      } else {
        nextTags = nextTags.filter(tag => tag !== action.name);
      }
      return [...state.slice(0, index), Object.assign({}, state[index], { tags: nextTags }), ...state.slice(index + 1)];
    default:
      return state;
  }
};
