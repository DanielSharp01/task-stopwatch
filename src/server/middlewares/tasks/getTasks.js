import { objectRequire } from "../../../utils/objectUtils";
import { yyyymmdd, packDate } from "../../../utils/timeFormat";

export default (objectRepository, type) => async (req, res, next) => {
  const Task = objectRequire(objectRepository, "Task");
  if (!req.params.date) return next({ status: 400, message: "No date param" });
  const ymd = yyyymmdd(req.params.date);
  if (!date.y) return next({ status: 400, message: "Date must be in the yyyy-mm-dd format." });
  const date = packDate(ymd);

  let rangeStart, rangeEnd; // End is not inclusive

  if (type === "day") {
    rangeStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    rangeEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  } else if (type === "week") {
    const dow = date.getDay() === 0 ? 7 : date.getDay();
    rangeStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dow + 1);
    rangeEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8 - dow);
  } else if (type === "month") {
    rangeStart = new Date(date.getFullYear(), date.getMonth());
    rangeEnd = new Date(date.getFullYear(), date.getMonth() + 1);
  }

  try {
    res.locals.tasks = Task.aggregate({
      $project: {
        stop: {
          $ifNull: ["$stop", new Date()]
        }
      }
    }).find({
      $nor: [{ $and: [{ start: { $lt: rangeStart } }, { stop: { $lt: rangeStart } }] }, { $and: [{ start: { $gte: rangeEnd } }, { stop: { $gte: rangeEnd } }] }]
    });
  } catch (err) {
    return next({ status: 500 });
  }

  return next();
};
