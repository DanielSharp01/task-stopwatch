export const NEW_TASK = "NEW_TASK";
export const CHANGE_TASK = "CHANGE_TASK";
export const STOP_TASK = "STOP_TASK";
export const CONTINUE_TASK = "CONTINUE_TASK";

export function newTask(name) {
  return {
    type: NEW_TASK,
    name
  };
}

export function changeTask(id, name) {
  return {
    type: CHANGE_TASK,
    id,
    name
  };
}

export function stopTask(id) {
  return {
    type: STOP_TASK,
    id
  };
}

export function continueTask(id) {
  return {
    type: CONTINUE_TASK,
    id
  };
}
