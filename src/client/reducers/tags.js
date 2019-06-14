import { NEW_TAGS_ADD_TAG, NEW_TAGS_CHANGE_TAG_NAME, CHANGE_TAG_COLOR } from "../actions/tags";
import { ADD_TAG_ON_TASK, CHANGE_TAG_ON_TASK, NEW_TASK, CONTINUE_TASK } from "../actions/tasks";

export const colors = ["red", "green", "blue", "yellow", "orange", "white", "gray", "black", "brown", "ocean", "purple", "pink"];
export function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default (state = {}, action) => {
  let nextTags = { ...state };
  switch (action.type) {
    case NEW_TAGS_ADD_TAG:
    case ADD_TAG_ON_TASK:
      if (typeof nextTags[action.name] === "undefined") {
        nextTags[action.name] = { name: action.name, color: action.color };
      }
      return nextTags;
    case NEW_TAGS_CHANGE_TAG_NAME:
    case CHANGE_TAG_ON_TASK:
      if (action.name === action.nextName) return state;

      if (action.nextName.trim().length > 0) {
        if (typeof nextTags[action.nextName] === "undefined") {
          nextTags[action.nextName] = { name: action.nextName, color: nextTags[action.name].color };
        }
      }

      return nextTags;
    case CHANGE_TAG_COLOR:
      nextTags[action.name].color = action.nextColor;
      return nextTags;
    default:
      return state;
  }
};
