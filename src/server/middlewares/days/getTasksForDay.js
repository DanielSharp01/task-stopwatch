import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Day = objectRequire(objectRepository, "Day");

  if (!req.params.dateStr) return next({ status: 400, message: "No dateStr param" });

  try {
    const result = await Day.findOne({ userId: req.userId, dateStr: req.body.dateStr })
      .populate("tasks")
      .populate("tags");
    res.locals.tasks = result ? result.tasks : [];
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
