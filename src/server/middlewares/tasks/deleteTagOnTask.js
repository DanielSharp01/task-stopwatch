import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Tag = objectRequire(objectRepository, "Tag");
  let promises = [];

  if (!req.params.name) return next({ status: 400, message: "No name param" });
  if (typeof req.body.name !== "string" && !req.body.name) return next({ status: 400, message: "No name property" });
  if (!res.locals.task) return next({ status: 400, message: "No task for user" });
  let index = res.locals.task.tags.findIndex(tag => tag.name === req.params.name);

  if (index === -1) return next({ status: 400, message: "No such tag on task" });

  res.locals.task.tags = [...res.locals.task.tags.slice(0, index), ...res.locals.task.tags.slice(index + 1)];
  promises.push(res.locals.task.save());
  try {
    await Promise.all(promises);
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
