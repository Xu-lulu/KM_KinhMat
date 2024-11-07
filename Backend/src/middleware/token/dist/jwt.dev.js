"use strict";

var jwt = require("jsonwebtoken");

var generateAccessToken = function generateAccessToken(user) {
  return jwt.sign({
    _id: user._id,
    role: user.role
  }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "3d"
  });
};

var generateRefreshToken = function generateRefreshToken(user) {
  return jwt.sign({
    _id: user._id,
    role: user.role
  }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "7d"
  });
};

module.exports = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken
};