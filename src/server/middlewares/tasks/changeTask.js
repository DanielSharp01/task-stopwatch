export default objectRepository => async (req, res, next) => {
  const Task = objectRequire(objectRepository, "Task");
  const Tag = objectRequire(objectRepository, "Tag");

  if (!res.locals.task) return next({ status: 400, message: "No task for user" });

  if (req.body.name) res.locals.task.name = req.body.name;
  if (req.body.start) res.locals.task.start = new Date(req.body.start);
  if (typeof req.body.stop !== "undefined") res.locals.task.stop = req.body.stop && new Date(req.body.stop);
  
  if (req.body.start > req.body.stop) return next({ status: 400, message: "Task start must be before stop" });
  const overlaps = await Task.find({ userId: req.userId, $and: [ { stop: { $gt: req.body.start } }, { start: { $lt: req.body.stop } } ] });
  if (overlaps.length > 0) return next({ status: 400, message: "Tasks cannot overlap" });

  if (typeof req.body.tags !== "undefined") {
    let resolvedTags = [];
    for (let { name: tagName, color: tagColor } of req.body.tags) {
      const tag = await Tag.findOrCreate({
        userId: req.userId,
        name: tagName
      });
      if (tag.isNew) {
        if (!tagColor) return next({ status: 400, message: `Tag "${tag.name}" has no color property` });
        tag.color = tagColor;
        promises.push(tag.save());
      }
      resolvedTags.push(tag);
    }

    res.locals.task.tags = resolvedTags;
  }

  try {
    await res.locals.task.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
