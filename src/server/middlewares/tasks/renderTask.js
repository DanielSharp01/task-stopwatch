export default () => (req, res, next) => {
  if (!res.locals.tag) {
    return next({ status: 404 });
  }

  if (res.locals.task.rectifyStopDate()) {
    res.locals.task.save();
  }

  const { _id, name, start, stop, tags, disabled } = res.locals.task;

  res.apiSend({
    id: _id,
    name,
    start,
    stop,
    tags: tags.map(({ name }) => name),
    disabled
  });
};
