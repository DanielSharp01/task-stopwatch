export default () => async (req, res, next) => {
  if (!req.body.name) return next({ status: 400, message: "No name property" });
  if (!res.locals.task) return next({ status: 400, message: "No task for user" });

  res.locals.task.name = req.body.name;
  try {
    await res.locals.task.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
