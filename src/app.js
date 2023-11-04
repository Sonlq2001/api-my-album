"use strict";

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// init db
require("./dbs/init.mongodb");

// init routes
app.use("", require("./routes"));

// handling error
app.use((req, res, next) => {
  // error not found
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
