export default () => (req, res, next) => {
  for (let task of res.locals.tasks) {
    if (task.rectifyStopDate()) {
      task.save();
    }
  }

  res.apiSend(
    res.locals.tasks.map(({ _id, name, start, stop, tags, disabled }) => ({
      id: _id,
      name,
      start,
      stop,
      tags: tags.map(({ name }) => name),
      disabled
    }))
  );
};
