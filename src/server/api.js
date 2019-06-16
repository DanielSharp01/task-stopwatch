import { Router } from "express";

import apiAuth from "./middlewares/apiAuth";
import apiFormat from "./middlewares/apiFormat";
import { getDays, getTasksForDay, renderDays } from "./middlewares/days";
import { getTag, getTags, changeTagColor, renderTag, renderTags } from "./middlewares/tags";
import {
  getTask,
  renderTasks,
  createTask,
  changeTask,
  stopTask,
  deleteTask,
  renderTask,
  createTagOnTask,
  changeTagOnTask
} from "./middlewares/tasks";

import Day from "./models/Day";
import Task from "./models/Task";
import Tag from "./models/Tag";

const objectRepository = { Day, Task, Tag };

const router = Router();

router.use(apiFormat());

router.get(`/days`, apiAuth(), getDays(objectRepository), renderDays());

router.get(`/tags`, apiAuth(), getTags(objectRepository), renderTags());
router.get(`/tags/:name`, apiAuth(), getTag(objectRepository), renderTag());
router.patch(`/tags/:name`, apiAuth(), getTag(objectRepository), changeTagColor(), renderTag());

router.get(`/days/:dateString`, apiAuth(), getTasksForDay(objectRepository), renderTasks());

router.post(`/tasks`, apiAuth(), createTask(objectRepository), renderTask());
router.get(`/tasks/:id`, apiAuth(), getTask(objectRepository), renderTask());
router.patch(`/tasks/:id`, apiAuth(), getTask(objectRepository), changeTask(), renderTask());
router.patch(`/tasks/:id/stop`, apiAuth(), getTask(objectRepository), stopTask(), renderTask());
router.delete(`/tasks/:id`, apiAuth(), getTask(objectRepository), deleteTask(), renderTask());

router.post(`/tasks/:id/tags`, apiAuth(), getTask(objectRepository), createTagOnTask(objectRepository), renderTag());
router.patch(`/tasks/:id/tags/:name`, apiAuth(), getTask(objectRepository), changeTagOnTask(objectRepository), renderTag());

router.use((req, res) => res.status(404).send());

router.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ status: err.status, error: err.message });
  } else {
    console.error(err);
    res.status(500).send({ status: 500, error: "Internal server error" });
  }
});

export default router;
