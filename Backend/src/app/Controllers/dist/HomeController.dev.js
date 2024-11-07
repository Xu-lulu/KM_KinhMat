"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var bcrypt = require("bcrypt");

var Users = require("../Models/Users");

var _require = require("../../middleware/token/jwt"),
    generateAccessToken = _require.generateAccessToken,
    generateRefreshToken = _require.generateRefreshToken;

var asyncHandle = require("express-async-handler");

var jwt = require("jsonwebtoken"); //Controller//


var Register = asyncHandle(function _callee(req, res, next) {
  var salt, hansed, DataUsers, checkuser, checkemail, emailRegex, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 2:
          salt = _context.sent;

          if (!(!req.body.username || !req.body.password || !req.body.email)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            sucess: false,
            mes: "Hãy nhập đầy đủ thông tin"
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 7:
          hansed = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(new Users({
            username: req.body.username,
            password: hansed,
            email: req.body.email
          }));

        case 10:
          DataUsers = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(Users.findOne({
            username: DataUsers.username
          }));

        case 13:
          checkuser = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(Users.findOne({
            email: DataUsers.email
          }));

        case 16:
          checkemail = _context.sent;

          if (!(checkuser || checkemail)) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            sucess: false,
            mes: "Tài khoản hoặc email đã được dùng"
          }));

        case 19:
          if (!(req.body.password.length <= 8)) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            sucess: false,
            mes: "Độ dài mật khẩu phải hơn 8 ký tự!!!"
          }));

        case 21:
          emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          if (emailRegex.test(req.body.email)) {
            _context.next = 26;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            sucess: false,
            mes: "Email không hợp lệ!!!"
          }));

        case 26:
          _context.next = 28;
          return regeneratorRuntime.awrap(DataUsers.save());

        case 28:
          users = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            sucess: users ? true : false,
            users: users
          }));

        case 30:
        case "end":
          return _context.stop();
      }
    }
  });
});
var Login = asyncHandle(function _callee2(req, res, next) {
  var _req$body, username, password, Checkuser, validPassword, _Checkuser$toObject, _password, isAdmin, newUsers, accessToken, refreshToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;

          if (!(!username || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            sucess: false,
            mes: "Hãy nhập đầy đủ thông tin"
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(Users.findOne({
            username: username
          }));

        case 5:
          Checkuser = _context2.sent;

          if (Checkuser) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            sucess: false,
            mes: "Incorrect username or password"
          }));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, Checkuser.password));

        case 10:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            sucess: false,
            mes: "Incorrect username or password"
          }));

        case 13:
          if (!(Checkuser && validPassword)) {
            _context2.next = 23;
            break;
          }

          _Checkuser$toObject = Checkuser.toObject(), _password = _Checkuser$toObject.password, isAdmin = _Checkuser$toObject.isAdmin, newUsers = _objectWithoutProperties(_Checkuser$toObject, ["password", "isAdmin"]);
          accessToken = generateAccessToken(Checkuser);
          refreshToken = generateRefreshToken(Checkuser);
          _context2.next = 19;
          return regeneratorRuntime.awrap(Users.findByIdAndUpdate(Checkuser._id, {
            refreshToken: refreshToken
          }, {
            "new": true
          }));

        case 19:
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
          });
          return _context2.abrupt("return", res.status(200).json({
            sucess: true,
            mes: "Đăng nhập thành công",
            accessToken: accessToken,
            refreshToken: refreshToken,
            newUsers: newUsers
          }));

        case 23:
          throw new Error("Tài khoản hoặc mật khẩu không chính xác!!!");

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var OneUsers = asyncHandle(function _callee3(req, res) {
  var _id, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _id = req.user._id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Users.findById({
            _id: _id
          }).select("-refreshToken -password -role"));

        case 3:
          user = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            success: false,
            rs: user ? user : "kshd"
          }));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var allUser = asyncHandle(function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Users.find().select("-refreshToken -password -role"));

        case 2:
          user = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            success: false,
            rs: user ? user : "kshd"
          }));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var logOut = asyncHandle(function _callee5(req, res, next) {
  var refreshTokens;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          refreshTokens = refreshTokens.filter(function (token) {
            return token !== req.body.token;
          });

          if (!refreshTokens) {
            _context5.next = 6;
            break;
          }

          res.clearCookie("refreshToken");
          return _context5.abrupt("return", res.status(200).json("Logged out successfully!"));

        case 6:
          throw new Error("Lỗi đăng xuất");

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = {
  Register: Register,
  Login: Login,
  logOut: logOut,
  OneUsers: OneUsers,
  allUser: allUser
};