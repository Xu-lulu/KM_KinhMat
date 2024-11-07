"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var categos = require("../Models/Category");

var CategoryControllnes =
/*#__PURE__*/
function () {
  function CategoryControllnes() {
    _classCallCheck(this, CategoryControllnes);
  }

  _createClass(CategoryControllnes, [{
    key: "updataCategory",
    value: function updataCategory(req, res, next) {
      var newdata;
      return regeneratorRuntime.async(function updataCategory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                newdata = new categos({
                  Namecategory: req.body.Namecategory
                });
                newdata.save();
                res.status(200).json(newdata);
              } catch (error) {
                res.status(500).json(error);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "allCategory",
    value: function allCategory(req, res, next) {
      var newdata;
      return regeneratorRuntime.async(function allCategory$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(categos.find());

            case 3:
              newdata = _context2.sent;
              res.status(200).json(newdata);
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json(_context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "findCategory",
    value: function findCategory(req, res, next) {
      var nameCate, newdata;
      return regeneratorRuntime.async(function findCategory$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              nameCate = req.params.name;
              _context3.next = 4;
              return regeneratorRuntime.awrap(categos.find({
                Namecategory: nameCate
              }));

            case 4:
              newdata = _context3.sent;
              res.status(200).json(newdata);
              console.log(nameCate);
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json(_context3.t0);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }]);

  return CategoryControllnes;
}();

module.exports = new CategoryControllnes();