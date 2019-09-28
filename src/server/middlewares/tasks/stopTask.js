export default () => async (req, res, next) => {
  if (!res.locals.task) return next({ status: 400, message: "No task for user" });

  res.locals.task.stop = new Date();

  try {
    await res.locals.task.save();
  } catch (err) {
    console.error();
    return next({ status: 500 });
  }
  return next();
};
