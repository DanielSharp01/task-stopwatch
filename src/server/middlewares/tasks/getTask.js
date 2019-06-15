import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Task = objectRequire(objectRepository, "Task");

  if (!req.params.id) return next({ status: 400, message: "No id param" });

  try {
    res.locals.task = await Task.findOne({ userId: req.userId, _id: req.params.id }).populate("tags");
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
