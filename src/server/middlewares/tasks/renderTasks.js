export default () => async (req, res, next) => {
  let promises = [];
  for (let task of res.locals.tasks) {
    if (task.rectifyStopDate()) {
      promises.push(task.save());
    }
  }

  try {
    await Promise.all(promises);
  } catch (err) {
    return next({ status: 500 });
  }

  res.apiSend(
    res.locals.tasks.map(({ _id, name, start, stop, tags, disabled }) => ({
      id: _id,
      name,
      start: start.getTime(),
      stop: stop && stop.getTime(),
      tags: tags.map(({ name }) => name),
      disabled
    }))
  );
};
