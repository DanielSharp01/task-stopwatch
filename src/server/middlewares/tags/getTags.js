import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Tag = objectRequire(objectRepository, "Tag");

  try {
    res.locals.tags = await Tag.find({ userId: req.userId });
  } catch (err) {
    return next({ status: 500 });
  }

  return next();
};
