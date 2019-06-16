import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";
import { accountsConnection } from "./db";
import apiRouter from "./api";
import auth from "./middlewares/auth";
import ssr from "./ssr";

const app = express();
const MongoStore = connectMongo(session);

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: accountsConnection })
  })
);
app.use(cookieParser());

app.use(auth());

app.use("/task-stopwatch", express.static("public"));

app.use("/task-stopwatch/api", apiRouter);

ssr(app);

const port = 3102;
app.listen(port, "localhost", () => console.log(`Listening on port ${port}!`));
