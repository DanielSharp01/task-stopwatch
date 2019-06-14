import { NEW_TAGS_ADD_TAG, NEW_TAGS_CHANGE_TAG_NAME } from "../actions/tags";

export default (state = [], action) => {
  switch (action.type) {
    case NEW_TAGS_ADD_TAG:
      return !state.includes(action.name) ? [...state, action.name] : state;
    case NEW_TAGS_CHANGE_TAG_NAME:
      if (action.name === action.nextName) return state;

      if (!state.includes(action.nextName) && action.nextName.trim().length > 0) {
        let changedIndex = state.findIndex(tag => tag === action.name);
        return [...state.slice(0, changedIndex), action.nextName, ...state.slice(changedIndex + 1)];
      } else {
        return state.filter(tag => tag !== action.name);
      }
    default:
      return state;
  }
};
