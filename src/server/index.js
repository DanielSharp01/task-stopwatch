import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/App";
const app = express();

app.use("/task-stopwatch", express.static("public"));

app.use("/task-stopwatch", (req, res) => {
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
      <title>Job Dashboard</title>
    </head>
    <body>
      <div id="root">${renderToString(<App />)}</div>
      <script src="/task-stopwatch/main.js"></script>
    </body>
  </html>`;
  res.send(html);
});

const port = 3102;
app.listen(port, "localhost", () => console.log(`Listening on port ${port}!`));
