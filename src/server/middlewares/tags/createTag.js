import { objectRequire } from "../../../utils/objectUtils";

export default objectRepository => async (req, res, next) => {
  const Tag = objectRequire(objectRepository, "Tag");

  if (!res.body.name) return next({ status: 400, message: "No name property" });
  if (!req.body.color) return next({ status: 400, message: "No color property" });
  res.locals.tag = Tag.findOrCreate({ userId: req.userId, name: req.body.name });
  if (!res.locals.tag.isNew) return next({ status: 400, message: "Tag already exists" });

  res.locals.tag.color = req.body.color;
  try {
    await res.locals.tag.save();
  } catch (err) {
    return next({ status: 500 });
  }

  return next();
};
