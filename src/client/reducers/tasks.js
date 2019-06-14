import { NEW_TASK, CHANGE_TASK, STOP_TASK, CONTINUE_TASK, ADD_TAG_ON_TASK, CHANGE_TAG_ON_TASK } from "../actions/tasks";

export default (state = {}, action, newTags) => {
  let id, newTask;
  let nextState = { ...state };
  switch (action.type) {
    case NEW_TASK:
      newTask = { id: action.tempId, name: action.name, start: Date.now(), tags: [...action.tags] };
      id = Object.keys(state).find(key => !state[key].stop);
      if (id) {
        nextState[id].stop = Date.now();
      }
      nextState[action.tempId] = newTask;
      return nextState;
    case CHANGE_TASK:
      nextState[action.id].name = action.name;
      return nextState;
    case STOP_TASK:
      id = action.id || Object.keys(state).find(key => !state[key].stop);
      nextState[id].stop = Date.now();
      return nextState;
    case ADD_TAG_ON_TASK:
      nextState[action.id].tags = [...nextState[action.id].tags, action.name];
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
