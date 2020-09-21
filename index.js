"use strict";
const http = require("http");

const hostname = "127.0.0.1";
const port = 3333;

const express = require("express"),
    es6Renderer = require("express-es6-template-engine"),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    es6Renderer = require('express-es6-template-engine'),
    cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    store: new FileStore(),
    secret: "get rad",
    resave: false,
    saveUninitialized: true,
    is_logged_in: false,
  })
);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

const rootController = require("./routes/index");
const usersController = require("./routes/users");

app.use("/", rootController); // <- ROOT route
app.use("/users", usersController); // <- /users route
