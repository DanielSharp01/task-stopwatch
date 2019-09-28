import uuid from "uuid/v4";
import { recieveTagResponse } from "./tags";

export const RECIEVE_TASKS = "RECIEVE_TASKS";
export const RECIEVE_TASK_RESPONSE = "RECIEVE_TASK_RESPONSE";
export const NEW_TASK = "NEW_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CHANGE_TASK = "CHANGE_TASK";
export const STOP_TASK = "STOP_TASK";
export const ADD_TAG_ON_TASK = "ADD_TAG_ON_TASK";
export const CHANGE_TAG_ON_TASK = "CHANGE_TAG_ON_TASK";

export function fetchTasks(dateString) {
  return async (dispatch, getState) => {
    try {
      let result = await fetch(`/task-stopwatch/api/tasks/day/${dateString}`);
      let json = await result.json();
      dispatch(recieveTasks(dateString, json.result));
    } catch (err) {
      console.error(err);
    }
  };
}

function recieveTasks(dateString, tasks) {
  return {
    type: RECIEVE_TASKS,
    dateString,
    tasks
  };
}

function recieveTaskResponse(task, tempId) {
  return {
    type: RECIEVE_TASK_RESPONSE,
    task,
    tempId
  };
}

export function newTask(name, tags) {
  return async (dispatch, getState) => {
    const now = new Date();
    const tempId = uuid();
    try {
      const { tags: storeTags, tasks } = getState();
      let stopId = Object.keys(tasks).find(key => !tasks[key].stop);
      if (stopId) dispatch(stopTask(stopId));
      dispatch(newTaskStore(tempId, name, now.getTime(), tags));
      let result = await fetch(`/task-stopwatch/api/tasks/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          start: now.getTime(),
          tags: tags.map(tag => storeTags[tag])
        })
      });
      let json = await result.json();
      console.log(json);
      dispatch(recieveTaskResponse(json.result, tempId));
    } catch (err) {
      console.error(err);
      dispatch(deleteTaskStore(tempId));
    }
  };
}

function newTaskStore(tempId, name, start, tags) {
  return {
    type: NEW_TASK,
    tempId: tempId,
    name,
    start,
    tags
  };
}

export function changeTask(id, name) {
  if (id === null) return { type: "NULL" };

  return async (dispatch, getState) => {
    const { tasks } = getState();
    const oldName = tasks[id].name;
    try {
      dispatch(changeTaskStore(id, name));
      let result = await fetch(`/task-stopwatch/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name
        })
      });
      let json = await result.json();
      dispatch(recieveTaskResponse(json.result));
    } catch (err) {
      dispatch(changeTaskStore(id, oldName));
    }
  };
}

function changeTaskStore(id, name) {
  return {
    type: CHANGE_TASK,
    id,
    name
  };
}

export function stopTask(id) {
  if (id === null) return { type: "NULL" };

  const now = new Date();
  return async (dispatch, getState) => {
    try {
      dispatch(stopTaskStore(id, now.getTime()));
      let result = await fetch(`/task-stopwatch/api/tasks/${id}/stop`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stop: now.getTime()
        })
      });
      let json = await result.json();
      dispatch(recieveTaskResponse(json.result));
    } catch (err) {
      dispatch(stopTaskStore(id, null));
    }
  };
}

function stopTaskStore(id, stop) {
  return {
    type: STOP_TASK,
    id,
    stop
  };
}

export function continueTask(id) {
  if (id === null) return { type: "NULL" };

  return (dispatch, getState) => {
    const { tasks } = getState();
    dispatch(newTask(tasks[id].name, tasks[id].tags));
  };
}

export function deleteTask(id) {
  if (id === null) return { type: "NULL" };

  return async (dispatch, getState) => {
    dispatch(deleteTaskStore(id));
    try {
      await fetch(`/task-stopwatch/api/tasks/${id}`, {
        method: "DELETE"
      });
    } catch (err) {
      dispatch(deleteTaskStore(id));
    }
  };
}

function deleteTaskStore(id) {
  return {
    type: DELETE_TASK,
    id
  };
}

export function addTagOnTask(id, name, color) {
  if (id === null) return { type: "NULL" };

  return async (dispatch, getState) => {
    try {
      dispatch(addTagOnTaskStore(id, name, color));
      let result = await fetch(`/task-stopwatch/api/tasks/${id}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          color
        })
      });
      let json = await result.json();
      console.log(json);
      dispatch(recieveTagResponse(json.result));
    } catch (err) {
      dispatch(changeTagOnTaskStore(id, name, ""));
    }
  };
}

function addTagOnTaskStore(id, name, color) {
  return {
    type: ADD_TAG_ON_TASK,
    id,
    name,
    color
  };
}

export function changeTagOnTask(id, name, nextName) {
  if (id === null) return { type: "NULL" };

  return async (dispatch, getState) => {
    try {
      const { tags } = getState();
      dispatch(changeTagOnTaskStore(id, name, nextName));
      let result = await fetch(`/task-stopwatch/api/tasks/${id}/tags/${name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: nextName,
          color: tags[name].color
        })
      });
      let json = await result.json();
      dispatch(recieveTagResponse(json.result));
    } catch (err) {
      dispatch(changeTagOnTaskStore(id, nextName, name));
    }
  };
}

function changeTagOnTaskStore(id, name, nextName) {
  return {
    type: CHANGE_TAG_ON_TASK,
    id,
    name,
    nextName
  };
}
