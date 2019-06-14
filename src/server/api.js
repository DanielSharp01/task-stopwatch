import { Router } from "express";

import { getDays, getTasksForDay, renderDays } from "./middlewares/days";
import { getTags, renderTags } from "./middlewares/tags";
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

const router = Router();
router.get(`/days`, getDays(), renderDays());

router.get(`/tags`, getTags(), renderTags());

router.get(`/days/:date`, getTasksForDay(), renderTasks());

router.post(`/tasks`, createTask(), renderTask());
router.get(`/tasks/:id`, getTask(), renderTask());
router.patch(`/tasks/:id`, getTask(), changeTask(), renderTask());
router.patch(`/tasks/:id/stop`, getTask(), stopTask(), renderTask());
router.delete(`/tasks/:id`, getTask(), deleteTask(), renderTask());

router.post(`/tasks/:id/tags`, getTask(), createTagOnTask(), renderTask());
router.patch(`/tasks/:id/tags/:tag`, getTask(), changeTagOnTask(), renderTask());

router.use("/", (req, res) => res.status(404).send());

export default router;
