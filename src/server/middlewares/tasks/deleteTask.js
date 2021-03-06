export default () => async (req, res, next) => {
  if (!res.locals.task) return next({ status: 400, message: "No task for user" });
  res.locals.task.disabled = true;
  try {
    await res.locals.task.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
