const expressAsyncHandler = require("express-async-handler");
const products = require("../Models/Products");
const uploadImagesProduct = expressAsyncHandler(async (req, res, next) => {
  const newdata = new products({
    Name: req.body.Name,
    Price: req.body.Price,
    Description: req.body.Description,
    Image: req.body.Image,
    count: req.body.count,
    Category: req.body.Category,
  });
  if (req.file) {
    newdata.Image = req.file.path;
  }
  newdata.save();
  res.status(200).json(newdata);
});
module.exports = {
  uploadImagesProduct,
};
