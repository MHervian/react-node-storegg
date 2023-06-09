// require modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

// define routes
const userRouter = require("./app/user/router");
const dashboardRouter = require("./app/dashboard/router");
const categoryRouter = require("./app/category/router");
const nominalRouter = require("./app/nominal/router");
const voucherRouter = require("./app/voucher/router");
const bankRouter = require("./app/bank/router");
const paymentRouter = require("./app/payment/router");
const transactionRouter = require("./app/transaction/router");
const playerRouter = require("./app/player/router");
const authRouter = require("./app/auth/router");

// create express, create API rule and implement cors 
const app = express();
const apiUrl = "/api/v1";
app.use(cors());

// view engine setup/templating engine, EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// apply session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use(flash()); // function ????
app.use(methodOverride("_method"));
app.use(logger("dev")); // log files
app.use(express.json()); // parses incoming json request
app.use(express.urlencoded({ extended: false })); // parses incoming request with URL-encoded payloads
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // serving static files from public folder 
app.use(
  "/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
); // serving static files from adminlte folder

// register all routes
app.use("/", userRouter);
app.use("/dashboard", dashboardRouter);
app.use("/category", categoryRouter);
app.use("/nominal", nominalRouter);
app.use("/voucher", voucherRouter);
app.use("/bank", bankRouter);
app.use("/payment", paymentRouter);
app.use("/transaction", transactionRouter);

// api
app.use(`${apiUrl}/players`, playerRouter);
app.use(`${apiUrl}/auth`, authRouter);

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
