"use strict";

var jwt = require("jsonwebtoken");

var asyncHandle = require("express-async-handler");

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.token;

  if (token) {
    var accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

var verifyTokenAndUserAuthorization = function verifyTokenAndUserAuthorization(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.id === req.params.id || req.user.role) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

var verifyTokenAndUser = function verifyTokenAndUser(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.role === 'user') {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

var verifyTokenAndAdmin = function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken: verifyToken,
  verifyTokenAndAdmin: verifyTokenAndAdmin,
  verifyTokenAndUser: verifyTokenAndUser,
  verifyTokenAndUserAuthorization: verifyTokenAndUserAuthorization
};