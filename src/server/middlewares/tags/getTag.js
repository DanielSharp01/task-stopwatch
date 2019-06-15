import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Tag = objectRequire(objectRepository, "Tag");

  if (!req.params.name) return next({ status: 400, message: "No name param" });

  try {
    res.locals.tag = await Tag.findOne({ userId: req.userId, name: req.params.name });
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
