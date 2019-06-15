export default () => (req, res, next) => {
  res.apiSend = json => {
    res.send({ status: 200, result: json });
  };
  return next();
};
