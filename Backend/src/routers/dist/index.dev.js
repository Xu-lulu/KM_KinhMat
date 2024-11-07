"use strict";

var home = require("./home");

var auth = require("./auth");

var products = require("./products");

var category = require("./category");

var _require = require("../middleware/errHandle"),
    notFound = _require.notFound,
    errHandle = _require.errHandle;

var route = function route(app) {
  app.use("/", home);
  app.use("/auth", auth);
  app.use("/", products);
  app.use("/", category);
  app.use(notFound);
  app.use(errHandle);
};

module.exports = route;