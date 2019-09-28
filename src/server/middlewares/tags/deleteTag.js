export default () => async (req, res, next) => {
  if (!res.locals.tag) return next({ status: 400, message: "No tag for user" });
  res.locals.tag.disabled = true;
  try {
    await res.locals.tag.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
