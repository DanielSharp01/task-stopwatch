import {
  NEW_TASK,
  RECIEVE_TASKS,
  RECIEVE_TASK_RESPONSE,
  CHANGE_TASK,
  STOP_TASK,
  DELETE_TASK,
  ADD_TAG_ON_TASK,
  CHANGE_TAG_ON_TASK
} from "../actions/tasks";

export default (state = {}, action, newTags) => {
  let id, newTask;
  let nextState = { ...state };
  switch (action.type) {
    case NEW_TASK:
      newTask = { id: action.tempId, saved: false, name: action.name, start: action.start, stop: null, tags: [...action.tags] };
      nextState[action.tempId] = newTask;
      return nextState;
    case RECIEVE_TASKS:
      for (let task of action.tasks) {
        nextState[task.id] = { ...task, saved: true };
      }
      return nextState;
    case RECIEVE_TASK_RESPONSE:
      newTask = Object.assign({}, nextState[action.task.id] || nextState[action.tempId] || {}, {
        id: action.task.id,
        saved: true,
        stop: action.task.stop
      });
      if (action.tempId) delete nextState[action.tempId];
      nextState[action.task.id] = newTask;
      console.log(newTask);
      return nextState;
    case CHANGE_TASK:
      nextState[action.id].name = action.name;
      return nextState;
    case STOP_TASK:
      id = action.id || Object.keys(state).find(key => !state[key].stop);
      nextState[id].stop = action.stop;
      return nextState;
    case DELETE_TASK:
      delete nextState[action.id];
      return nextState;
    case ADD_TAG_ON_TASK:
      if (!nextState[action.id].tags.includes(action.name)) nextState[action.id].tags = [...nextState[action.id].tags, action.name];
      return nextState;
    case CHANGE_TAG_ON_TASK:
      if (action.name === action.nextName) return state;

      let nextTags = nextState[action.id].tags;
      if (!nextState[action.id].tags.includes(action.nextName) && action.nextName.trim().length > 0) {
        let tagIndex = nextState[action.id].tags.findIndex(tag => tag === action.name);
        nextTags = [...nextTags.slice(0, tagIndex), action.nextName, ...nextTags.slice(tagIndex + 1)];
      } else {
        nextTags = nextTags.filter(tag => tag !== action.name);
      }

      nextState[action.id].tags = nextTags;
      return nextState;
    default:
      return state;
  }
};
