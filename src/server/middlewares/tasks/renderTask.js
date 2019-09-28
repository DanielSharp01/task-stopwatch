export default () => async (req, res, next) => {
  if (!res.locals.task) {
    return next({ status: 404 });
  }

  const { _id, name, start, stop, tags, disabled } = res.locals.task;

  res.apiSend({
    id: _id,
    name,
    start: start.getTime(),
    stop: stop && stop.getTime(),
    tags: tags.map(({ name }) => name),
    disabled
  });
};
