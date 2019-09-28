import React from "react";
import { renderToString } from "react-dom/server";
import { createStore } from "redux";
import reducer from "../client/reducers";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";

import apiAuth from "./middlewares/apiAuth";
import serialize from "serialize-javascript";

import { getTags, renderTags } from "./middlewares/tags";
import { getTasks, renderTasks } from "./middlewares/tasks";

import User from "./models/User";
import Day from "./models/Day";
import Task from "./models/Task";
import Tag from "./models/Tag";

import { formatTime, getDateParts } from "../utils/timeFormat";
import Routes from "../client/components/Routes/Routes";

const objectRepository = { Day, Task, Tag };

function callMiddlewareAsync(middleware, req, res) {
  return new Promise((resolve, reject) => {
    middleware(req, res, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function callMiddlewareChainAsync(req, res, ...middlewares) {
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

async function getInitialState(req, dateString) {
  let initialState = {};

  let days = await callMiddlewareChainAsync(Object.assign({ ...req }, { date: dateString }), {}, apiAuth(), getTasks(objectRepository, "day"), renderDays());
  initialState.days = days.reduce((acc, key) => {
    acc[key] = { lodaded: false };
    return acc;
  }, {});
  if (!days[dateString]) initialState.days[dateString] = { tasks: [] };

  let tasks = await callMiddlewareChainAsync(
    Object.assign({}, req, { params: { dateString } }),
    {},
    apiAuth(),
    getTasksForDay(objectRepository),
    renderTasks()
  );

  initialState.days[dateString].tasks = tasks.map(task => task.id);
  initialState.days[dateString].loaded = true;

  initialState.tasks = tasks.reduce((acc, task) => {
    acc[task.id] = Object.assign({}, task, { saved: true });
    return acc;
  }, {});

  let tags = await callMiddlewareChainAsync(req, {}, apiAuth(), getTags(objectRepository), renderTags());
  initialState.tags = tags.reduce((acc, tag) => {
    acc[tag.name] = tag;
    return acc;
  }, {});

  return initialState;
}

export default app => {
  app.use("/task-stopwatch/:dateString?", async (req, res, next) => {
    let initialState = await getInitialState(req, req.params.dateString || formatTime(getDateParts(new Date()), "YYYY-MM-DD"));
    let loggedInUser = await User.findOne({ _id: req.userId });
    if (!loggedInUser) return next("There was an error!");
    initialState.username = loggedInUser.username;
    req.session.redirectUrl = req.originalUrl;
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
        <script>
          window.__INITIAL_STATE__=${serialize(initialState, { isJSON: true })}
        </script>
      </head>
      <body>
        <div id="root">${renderToString(
          <StaticRouter location={req.originalUrl} context={{}}>
            <Provider store={createStore(reducer, initialState)}>
              <Routes />
            </Provider>
          </StaticRouter>
        )}</div>
        <script src="/task-stopwatch/main.js"></script>
      </body>
    </html>`;
    res.send(html);
  });
};
