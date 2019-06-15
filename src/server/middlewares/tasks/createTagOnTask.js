import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Tag = objectRequire(objectRepository, "Tag");
  let promises = [];

  if (!req.body.name) return next({ status: 400, message: "No name property" });
  if (!res.locals.task) return next({ status: 400, message: "No task for user" });

  const tag = await Tag.findOrCreate({ userId: req.userId, name: req.body.name });
  if (tag.isNew) {
    if (!req.body.color) return next({ status: 400, message: "No color property" });
    tag.color = req.body.color;
    promises.push(tag.save());
  }

  res.locals.task.tags.push(tag);
  promises.push(res.locals.task.save());
  try {
    await Promise.all(promises);
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
