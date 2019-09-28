import { Router } from "express";

import apiFormat from "./middlewares/apiFormat";

import tasks from "./api-routes/tasks";
import tags from "./api-routes/tags";

import Task from "./models/Task";
import Tag from "./models/Tag";

const objectRepository = { Task, Tag };

const router = Router();

router.use(apiFormat());

tasks(router, objectRepository);
tags(router, objectRepository);

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
