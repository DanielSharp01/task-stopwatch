export default () => async (req, res, next) => {
  res.apiSend(
    res.locals.tasks.filter(({disabled}) => !disabled).map(({ _id, name, start, stop, tags }) => ({
      id: _id,
      name,
      start: start.getTime(),
      stop: stop && stop.getTime(),
      tags: tags.map(({ name }) => name),
    }))
  );
};
