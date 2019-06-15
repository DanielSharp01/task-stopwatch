import auth from "./auth";
import mongoose from "mongoose";

export default () => (req, res, next) => {
  auth(false, false)(req, res, () => {
    if (req.authed) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  });
};
