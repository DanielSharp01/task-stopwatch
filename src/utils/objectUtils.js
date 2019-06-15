export default () =>
  (Object.assignDefined = (target, ...sources) => {
    for (const source of sources) {
      for (const key of Object.keys(source)) {
        if (typeof source[key] !== "undefined") {
          target[key] = source[key];
        }
      }
    }
    return target;
  });

export function objectRequire(obj, property) {
  let keys = property.split(".");
  let checkedKey = "";
  for (let key of keys) {
    checkedKey += (checkedKey.length > 0 ? "." : "") + key;
    if (obj[key]) obj = obj[key];
    else throw new Error(`Required object key ${checkedKey} does not exist.`);
  }

  return obj;
}
