import { combineReducers } from "redux";
import days from "./days";
import tasks from "./tasks";
import tags from "./tags";
import newTags from "./newTags";

export default combineReducers({
  days,
  tasks,
  tags,
  newTags,
  username: (state = "not seen", action) => state
});
