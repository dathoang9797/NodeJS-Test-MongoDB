const express = require("express");
const path = require("path");
const logger = require("morgan");
const ErrorController = require("./controllers/errorController");
const AppError = require("./util/AppErrorHanding");
const usersRouter = require("./routes/usersRouter");
const cors = require("cors");
const app = express();
const buildPath = path.join(__dirname, "client", "build");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(buildPath));
app.use(cors(), usersRouter);
app.all("*", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.use(ErrorController);
module.exports = app;
