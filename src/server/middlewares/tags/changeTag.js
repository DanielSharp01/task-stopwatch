export default () => async (req, res, next) => {
  if (!res.locals.tag) return next({ status: 400, message: "No tag for user" });

  if (req.body.color) {
    res.locals.tag.color = req.body.color;
    try {
      await res.locals.tag.save();
    } catch (err) {
      return next({ status: 500 });
    }
  }

  return next();
};
