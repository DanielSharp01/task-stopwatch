import apiAuth from "../middlewares/apiAuth";
import {
  getTasks,
  getTask,
  createTask,
  changeTask,
  stopTask,
  startTask,
  deleteTask,
  renderTasks,
  renderTask,
  createTagOnTask,
  changeTagOnTask,
  deleteTagOnTask
} from "../middlewares/tasks";

import { renderTag } from "../middlewares/tags";

export default (router, objectRepository) => {
  router.get("/tasks/day/:date", apiAuth(), getTasks(objectRepository, "day"), renderTasks());
  router.get("/tasks/week/:date", apiAuth(), getTasks(objectRepository, "week"), renderTasks());
  router.get("/tasks/month/:date", apiAuth(), getTasks(objectRepository, "month"), renderTasks());

  router.post("/tasks", apiAuth(), createTask(objectRepository), renderTask());
  router.get("/tasks/:id", apiAuth(), getTask(objectRepository), renderTask());
  router.patch("/tasks/:id", apiAuth(), getTask(objectRepository), changeTask(), renderTask());
  router.delete("/tasks/:id", apiAuth(), getTask(objectRepository), deleteTask(), renderTask());

  // Higher level APIs

  router.post("/tasks/start", apiAuth(), startTask(objectRepository), renderTask());
  router.patch("/tasks/:id/stop", apiAuth(), getTask(objectRepository), stopTask(), renderTask());

  // Task-Tag APIs
  router.post("/tasks/:id/tags", apiAuth(), getTask(objectRepository), createTagOnTask(objectRepository), renderTag());
  router.patch("/tasks/:id/tags/:tagname", apiAuth(), getTask(objectRepository), changeTagOnTask(objectRepository), renderTag());
  router.delete("/tasks/:id/tags/:tagname", apiAuth(), getTask(objectRepository), deleteTagOnTask(objectRepository), renderTag());
};
