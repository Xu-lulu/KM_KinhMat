"use strict";

var mongoose = require("mongoose");

var Users = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 6,
    max: 20,
    unique: true
  },
  password: {
    type: String,
    require: true,
    min: 8,
    unique: true
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true
  },
  role: {
    type: String,
    "default": "user"
  },
  refreshToken: {
    type: String
  },
  deleteAt: {
    type: String
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Users", Users);