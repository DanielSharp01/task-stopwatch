export default () => (req, res, next) => {
  if (!res.locals.tag) {
    return next({ status: 404 });
  }

  const { name, color } = res.locals.tag;
  res.apiSend({ name, color });
};
