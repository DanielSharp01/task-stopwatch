import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/components/App/App";
import { createStore } from "redux";
import reducer from "../client/reducers";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { accountsConnection } from "./db";
import apiRouter from "./api";

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

app.use("/task-stopwatch", express.static("public"));

app.use("/task-stopwatch/api", apiRouter);

app.use("/task-stopwatch/:date?", (req, res) => {
  let html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
        crossorigin="anonymous"
      />
      <link href="/task-stopwatch/style.css" rel="stylesheet" />
      <title>Task Stopwatch</title>
    </head>
    <body>
      <div id="root">${renderToString(
        <StaticRouter location={req.url} context={{}}>
          <Provider store={createStore(reducer)}>
            <App />
          </Provider>
        </StaticRouter>
      )}</div>
      <script src="/task-stopwatch/main.js"></script>
    </body>
  </html>`;
  res.send(html);
});

const port = 3102;
app.listen(port, "localhost", () => console.log(`Listening on port ${port}!`));
