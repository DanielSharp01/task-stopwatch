import { combineReducers } from "redux";
import tasks from "./tasks";
import { TIMER } from "../actions";

export default combineReducers({
  tasks,
  time: (state = Date.now(), action) => {
    switch (action.type) {
      case TIMER:
        return Date.now();
      default:
        return state;
    }
  }
});
