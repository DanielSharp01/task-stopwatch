import { combineReducers } from "redux";
import tasks from "./tasks";
import tags from "./tags";
import newTags from "./newTags";

export default (state = {}, action) => {
  return {
    tasks: tasks(state.tasks, action, state.newTags || []),
    tags: tags(state.tags, action),
    newTags: newTags(state.newTags, action)
  };
};
