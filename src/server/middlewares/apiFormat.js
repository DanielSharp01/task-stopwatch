export default () => (req, res, next) => {
  res.apiSend = (json, { ...optional }) => {
    res.send({ status: 200, result: json, ...optional });
  };
  return next();
};
