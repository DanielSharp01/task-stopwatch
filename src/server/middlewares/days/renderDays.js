export default () => (req, res, next) => {
  res.apiSend(res.locals.days.map(({ dateString }) => dateString));
};
