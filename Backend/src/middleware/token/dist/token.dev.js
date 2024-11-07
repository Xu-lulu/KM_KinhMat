"use strict";

var jwt = require("jsonwebtoken");

var generateAccessToken = function generateAccessToken(uid, isadmin) {
  return jwt.sign({
    _id: uid,
    isadmin: isadmin
  }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "3d"
  });
};

var generateRefreshToken = function generateRefreshToken(uid, isadmin) {
  return jwt.sign({
    _id: uid,
    isadmin: isadmin
  }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d"
  });
};

module.exports = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken
};