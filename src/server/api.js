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


import tasks from "./api-routes/tasks"
import tags from "./api-routes/tags"
import userSettings from "./api-routes/userSettings"

import Day from "./models/Day";
import Task from "./models/Task";
import Tag from "./models/Tag";

const objectRepository = { Day, Task, Tag };

const router = Router();

router.use(apiFormat());

tasks(router, objectRepository);
tags(router, objectRepository)
userSettings(router, objectRepository)

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
