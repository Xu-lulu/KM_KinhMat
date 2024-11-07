const home = require("./home");
const auth = require("./auth");
const products = require("./products");
const category = require("./category");
const cart = require("./cart");
const bank = require("./bank");
const seller = require("./seller");
const { notFound, errHandle } = require("../middleware/errHandle");

const route = (app) => {
  app.use("/", home);
  app.use("/", auth);
  app.use("/products", products);
  app.use("/category", category);
  app.use("/cart", cart);
  app.use("/bank", bank);
  app.use("/seller", seller);

  app.use(notFound);
  app.use(errHandle);
};

module.exports = route;
