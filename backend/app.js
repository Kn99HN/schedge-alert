const express = require("express");
const cors = require("cors");

const courseRouter = require("./router/courseRouter");
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const db = require("./utils/db_helper");

const app = express();

db.connect().catch((err) => {
  logger.error(err);
})

// utils
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.morganLogger());

// routers
app.use("/", courseRouter);


// handler
app.use(middleware.unknownRouteHandler);
app.use(middleware.errorHandler);

module.exports = app;
