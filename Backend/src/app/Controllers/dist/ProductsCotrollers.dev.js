"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var products = require("../Models/Products");

var ProductsControllnes =
/*#__PURE__*/
function () {
  function ProductsControllnes() {
    _classCallCheck(this, ProductsControllnes);
  }

  _createClass(ProductsControllnes, [{
    key: "updataProducts",
    value: function updataProducts(req, res, next) {
      var newdata;
      return regeneratorRuntime.async(function updataProducts$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                newdata = new products({
                  Name: req.body.Name,
                  Price: req.body.Price,
                  Description: req.body.Description,
                  Image: req.body.Image,
                  count: req.body.count,
                  Category: req.body.Category
                });

                if (req.file) {
                  newdata.Image = req.file.path;
                }

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
    key: "allProducts",
    value: function allProducts(req, res, next) {
      var dataproducts;
      return regeneratorRuntime.async(function allProducts$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(products.find());

            case 3:
              dataproducts = _context2.sent;
              res.status(200).json(dataproducts);
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
    key: "dataupdate",
    value: function dataupdate(req, res, next) {
      var id, dataproducts;
      return regeneratorRuntime.async(function dataupdate$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return regeneratorRuntime.awrap(products.findById(id));

            case 4:
              dataproducts = _context3.sent;
              res.status(200).json(dataproducts);
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "delete",
    value: function _delete(req, res, next) {
      var id, data;
      return regeneratorRuntime.async(function _delete$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              _context4.next = 4;
              return regeneratorRuntime.awrap(products.findOneAndDelete({
                _id: id
              }));

            case 4:
              data = _context4.sent;
              res.status(200).json(data);
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              res.status(500).json(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "update",
    value: function update(req, res, next) {
      var id, updatedData, data;
      return regeneratorRuntime.async(function update$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              updatedData = {
                Name: req.body.Name,
                Price: req.body.Price,
                Description: req.body.Description,
                Image: req.body.Image,
                count: req.body.count,
                Category: req.body.Category
              };

              if (req.file) {
                updatedData.Image = req.file.path;
              }

              _context5.next = 6;
              return regeneratorRuntime.awrap(products.findOneAndUpdate({
                _id: id
              }, updatedData, {
                "new": true
              }));

            case 6:
              data = _context5.sent;
              res.status(200).json(data);
              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              res.status(500).json(_context5.t0);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "findProducts",
    value: function findProducts(req, res, next) {
      var name, data;
      return regeneratorRuntime.async(function findProducts$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              name = req.params.name;
              console.log(name);
              _context6.next = 5;
              return regeneratorRuntime.awrap(products.find({
                Name: name
              }));

            case 5:
              data = _context6.sent;
              res.status(200).json(data);
              console.log(data);
              _context6.next = 13;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              res.status(500).json(_context6.t0);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "findCategory",
    value: function findCategory(req, res, next) {
      var nameCate, newdata;
      return regeneratorRuntime.async(function findCategory$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              nameCate = req.params.name;
              _context7.next = 4;
              return regeneratorRuntime.awrap(products.find({
                Category: nameCate
              }));

            case 4:
              newdata = _context7.sent;
              res.status(200).json(newdata);
              console.log(nameCate);
              _context7.next = 12;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              res.status(500).json(_context7.t0);

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }]);

  return ProductsControllnes;
}();

module.exports = new ProductsControllnes();