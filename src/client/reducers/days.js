import { NEW_TASK, RECIEVE_TASKS, RECIEVE_TASK_RESPONSE } from "../actions/tasks";
import { formatTime, getDateParts } from "../../utils/timeFormat";

export default (state = {}, action) => {
  let nextState = { ...state };
  let dateString;
  switch (action.type) {
    case NEW_TASK:
      dateString = formatTime(getDateParts(action.start), "YYYY-MM-DD");
      nextState[dateString].tasks = [...nextState[dateString].tasks, action.tempId];
      return nextState;
    case RECIEVE_TASKS:
      dateString = action.dateString;
      nextState[dateString].loaded = true;
      nextState[dateString].tasks = action.tasks.sort((a, b) => a.start < b.start).map(task => task.id);
      return nextState;
    case RECIEVE_TASK_RESPONSE:
      if (!action.tempId) return state;
      dateString = formatTime(getDateParts(action.task.start), "YYYY-MM-DD");

      let index = nextState[dateString].tasks.findIndex(task => task === action.tempId);
      if (index < 0) return state;

      nextState[dateString].tasks[index] = action.task.id;
      return nextState;
    default:
      return state;
  }
};
