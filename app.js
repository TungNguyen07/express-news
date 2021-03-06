require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users.route");
const postRouter = require("./routes/post.route");

const checkCookie = require("./middleware/validateLogin");

const app = express();

var url = process.env.MONGO_URL || "mongodb://localhost/express-news";
mongoose
  .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Database connect sucessfully!");
  })
  .catch(() => {
    console.log("Connect database failed!");
  });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser("U64dgahG1"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", checkCookie.checkCookie, usersRouter);
app.use("/post", checkCookie.checkCookie, postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
