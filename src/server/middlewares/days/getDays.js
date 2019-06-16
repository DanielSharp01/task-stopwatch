import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Day = objectRequire(objectRepository, "Day");

  try {
    res.locals.days = await Day.find({ userId: req.userId });
  } catch (err) {
    console.error(err);
    return next({ status: 500 });
  }

  return next();
};
