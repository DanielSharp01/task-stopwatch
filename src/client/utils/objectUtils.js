export default () => Object.assignDefined = (target, ...sources) => {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      if (typeof source[key] !== "undefined") {
        target[key] = source[key];
      }
    }
  }
  return target;
}