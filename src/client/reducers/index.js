export default (state = { time: new Date().toISOString() }, action) => {
  return { time: new Date().toISOString() };
};
