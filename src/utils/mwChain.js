export function callMiddlewareAsync(middleware, req, res) {
  return new Promise((resolve, reject) => {
    middleware(req, res, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function callMiddlewareChainAsync(req, res, ...middlewares) {
  return new Promise(async (resolve, reject) => {
    try {
      res.cookie = () => {};
      res.locals = {};
      res.apiSend = json => {
        return resolve(json);
      };
      for (let middleware of middlewares) {
        await callMiddlewareAsync(middleware, req, res);
      }
      resolve();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}
