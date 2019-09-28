import auth from "./auth";

export default () => (req, res, next) => {
  auth(false, false)(req, res, () => {
    if (req.authed) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  });
};
