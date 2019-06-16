import { getDateParts, formatTime } from "../../../utils/timeFormat";
import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Task = objectRequire(objectRepository, "Task");
  const Day = objectRequire(objectRepository, "Day");
  const Tag = objectRequire(objectRepository, "Tag");

  let promises = [];
  if (!req.body.name) return next({ status: 400, message: "No name property" });
  if (!req.body.start) return next({ status: 400, message: "No start property" });
  req.body.tags = req.body.tags || [];

  res.locals.task = Task.create({ userId: req.userId, name: req.body.name });
  res.locals.task.start = new Date(req.body.start);

  let resolvedTags = [];
  for (let { name: tagName, color: tagColor } of req.body.tags) {
    const tag = await Tag.findOrCreate({ userId: req.userId, name: tagName });
    if (tag.isNew) {
      if (!tagColor) return next({ status: 400, message: "No color property" });
      tag.color = tagColor;
      promises.push(tag.save());
    }
    resolvedTags.push(tag);
  }

  res.locals.task.tags = resolvedTags;
  res.locals.task.stop = null;

  const dateString = formatTime(getDateParts(res.locals.task.start), "YYYY-MM-DD");
  const day = await Day.findOrCreate({ userId: req.userId, dateString });
  day.tasks.push(res.locals.task);
  promises.push(res.locals.task.save());
  promises.push(day.save());
  try {
    await Promise.all(promises);
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
