import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Task = objectRequire(objectRepository, "Task");

  const task = Task.create({ userId: req.userId, name: res.locals.task.name });
  task.start = new Date();
  task.tags = res.locals.task.tags;
  task.stop = null;
  res.locals.task = task;

  try {
    await res.locals.task.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
