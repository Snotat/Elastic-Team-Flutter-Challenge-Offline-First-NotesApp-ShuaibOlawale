var createError = require("http-errors");
var express = require("express");
var path = require("path");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
var app = express();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

require("dotenv").config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

var indexRouter = require("./routes/index");
var getRouter = require("./routes/getNote");
var setRouter = require("./routes/setNote");
var editRouter = require("./routes/editNote");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

mongoose.connect(
  "mongodb+srv://olawale:olawale5566@cluster0.cun74.mongodb.net/contact?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback() {
  console.log("Database connected successfully");
});

app.use(connectLiveReload());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/get", getRouter);
app.use("/set", setRouter);
app.use("/edit", editRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
