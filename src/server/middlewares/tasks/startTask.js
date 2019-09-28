import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  console.log("start task", "params", req.params, "body", req.body);
  const Task = objectRequire(objectRepository, "Task");
  const Tag = objectRequire(objectRepository, "Tag");

  let promises = [];
  if (!req.body.name) return next({ status: 400, message: "No name property" });
  req.body.tags = req.body.tags || [];

  res.locals.task = Task.create({ userId: req.userId, name: req.body.name });
  res.locals.task.start = new Date(req.body.start || undefined);

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

  try {
    await res.locals.task.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
