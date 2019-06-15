import { getDateParts, formatTime } from "../../../utils/timeFormat";
import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Task = objectRequire(objectRepository, "Task");
  const Day = objectRequire(objectRepository, "Day");

  if (!req.body.name) return next({ status: 400, message: "No name property" });
  if (!req.body.start) return next({ status: 400, message: "No start property" });

  res.locals.task = Task.create({ userId: req.userId, name: req.body.name });
  res.locals.task.start = new Date(req.body.start);
  res.locals.task.stop = null;

  const dateString = formatTime(getDateParts(res.locals.task.start), "YYYY-MM-DD");
  const day = await Day.findOrCreate({ userId: req.userId, dateString });
  day.tasks.push(res.locals.task);
  try {
    await res.locals.task.save();
    await day.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
