import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Tag = objectRequire(objectRepository, "Tag");
  let promises = [];

  if (!req.params.tagname) return next({ status: 400, message: "No tagname param" });
  if (typeof req.body.name !== "string" && !req.body.name) return next({ status: 400, message: "No name property" });
  if (!res.locals.task) return next({ status: 400, message: "No task for user" });

  let tag = false;
  if (req.body.name.trim().length > 0) {
    tag = await Tag.findOrCreate({ userId: req.userId, name: req.body.name });
    if (tag.isNew) {
      if (!req.body.color) return next({ status: 400, message: "No color property" });
      tag.color = req.body.color;
      promises.push(tag.save());
    }
  }
  res.locals.tag = tag;

  let index = res.locals.task.tags.findIndex(tag => tag.name === req.params.tagname);

  if (index === -1) return next({ status: 400, message: "No such tag on task" });

  if (tag !== false && res.locals.task.tags.findIndex(t => t.id === tag.id) === -1) {
    res.locals.task.tags = [...res.locals.task.tags.slice(0, index), tag, ...res.locals.task.tags.slice(index + 1)];
  } else {
    res.locals.task.tags = [...res.locals.task.tags.slice(0, index), ...res.locals.task.tags.slice(index + 1)];
  }
  promises.push(res.locals.task.save());
  try {
    await Promise.all(promises);
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
