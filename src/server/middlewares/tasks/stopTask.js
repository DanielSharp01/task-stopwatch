export default () => async (req, res, next) => {
  if (!req.body.stop) return next({ status: 400, message: "No stop property" });
  if (!res.locals.task) return next({ status: 400, message: "No task for user" });

  res.locals.task.stop = new Date(req.body.stop);
  res.locals.task.rectifyStopDate();
  try {
    await res.locals.task.save();
  } catch (err) {
    return next({ status: 500 });
  }
  return next();
};
