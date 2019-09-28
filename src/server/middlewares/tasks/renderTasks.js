export default () => async (req, res, next) => {
  res.apiSend(
    {
      result: res.locals.tasks.map(({ _id, name, start, stop, tags, disabled }) => ({
        id: _id,
        name,
        start: start.getTime(),
        stop: stop && stop.getTime(),
        tags: tags.map(({ name }) => name),
        disabled
      }))
    },
    { query: { range: res.locals.range } }
  );
};
