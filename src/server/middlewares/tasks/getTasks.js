import { objectRequire } from "../../../utils/objectUtils";
import { yyyymmdd, packDate } from "../../../utils/timeFormat";

export default (objectRepository, type) => async (req, res, next) => {
  const Task = objectRequire(objectRepository, "Task");
  const Tag = objectRequire(objectRepository, "Tag");
  if (!req.params.date) return next({ status: 400, message: "No date param" });
  const ymd = yyyymmdd(req.params.date);
  if (!ymd.year) return next({ status: 400, message: "Date must be in the yyyy-mm-dd format." });
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
    res.locals.tasks = (await Task.aggregate()
      .match({ userId: req.userId })
      .addFields({
        stop: { $ifNull: ["$stop", new Date()] }
      })
      .match({
        $nor: [
          { $and: [{ start: { $lt: rangeStart } }, { stop: { $lt: rangeStart } }] },
          { $and: [{ start: { $gte: rangeEnd } }, { stop: { $gte: rangeEnd } }] }
        ]
      })
      .lookup({ from: Tag.collection.name, localField: "tags", foreignField: "_id", as: "tagObjects" })).map(({ tagObjects, ...rest }) => ({
      ...rest,
      tags: tagObjects
    }));
    res.locals.range = { start: rangeStart, end: rangeEnd };
  } catch (err) {
    console.error(err);
    return next({ status: 500 });
  }

  return next();
};
