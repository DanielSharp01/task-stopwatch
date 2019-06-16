import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Day = objectRequire(objectRepository, "Day");

  if (!req.params.dateString) return next({ status: 400, message: "No dateString param" });

  try {
    const result = await Day.findOne({ userId: req.userId, dateString: req.params.dateString })
      .populate({ path: "tasks", populate: { path: "tags" } })
      .exec();
    res.locals.tasks = result ? result.tasks : [];
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
