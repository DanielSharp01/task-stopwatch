import tasks from "./tasks";
import tags from "./tags";
import newTags from "./newTags";
import { NEW_TASK } from "../actions/tasks";
import { formatTime, getDateParts } from "../utils/timeFormat";

export default (
  state = { "2019-06-14": { tasks: [] }, "2019-06-13": {}, "2019-06-12": {}, "2019-05-31": {}, "2019-05-30": {} },
  action
) => {
  let currentDay = formatTime(getDateParts(new Date()), "YYYY-MM-DD");
  let nextState = { ...state };
  switch (action.type) {
    case NEW_TASK:
      nextState[currentDay].tasks = [...nextState[currentDay].tasks, action.tempId];
    default:
      return state;
  }
};
