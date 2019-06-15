export default () => (req, res, next) => {
  res.apiSend(
    res.locals.tags.map(({ name, color }) => ({
      name,
      color
    }))
  );
};
