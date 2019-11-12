export default () => async (req, res, next) => {
  res.apiSend(
    res.locals.tasks.sort((s, t) => s.start.getTime() - t.start.getTime()).map(({ _id, name, start, stop, tags, disabled }) => ({
      id: _id,
      name,
      start: start.getTime(),
      stop: stop && stop.getTime(),
      tags: tags.map(({ name }) => name),
      disabled
    })),
    { query: { range: res.locals.range } }
  );
};
