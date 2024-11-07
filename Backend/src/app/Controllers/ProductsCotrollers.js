const expressAsyncHandler = require("express-async-handler");
const products = require("../Models/Products");
const { uploadImage, deleteImage } = require("../../config/ImageClodinary");
const getPublicIdFromUrl = require("../../config/pathPublicid");
class ProductsControllnes {
  async createProducts(req, res, next) {
    try {
      // const { Name, Price, Description, Image, count, Category } = req.body;
      const image = req.files["Image"] ? req.files["Image"][0] : null; // Ảnh chính
      const setFileList = req.files["setFileList"] || []; // Mảng ảnh chi tiết

      // const dataUrl = await uploadImage(req.file.path);
      // console.log("data", dataUrl.secure_url);
      // const newdata = await products.create({
      //   Name,
      //   Price,
      //   Description,
      //   Image: req.file.path,
      //   count,
      //   Category,
      // });
      // res.status(200).json(newdata);
      res.status(200).json({
        message: "Upload thành công",
      });
    } catch (error) {
      console.log("lỗi 500");
      res.status(500).json({
        message: "Upload thất bại",
        error: error.message,
      });
    }
  }
  async allProducts(req, res, next) {
    try {
      const dataproducts = await products.find();
      res.status(200).json(dataproducts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async allProductsAdmin(req, res, next) {
    try {
      const dataproducts = await products.find();
      res.status(200).json(dataproducts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async dataupdate(req, res, next) {
    try {
      const id = req.params.id;
      const dataproducts = await products.findById(id);
      res.status(200).json(dataproducts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const dataproducts = await products.findById({ _id: id });
      const publicId = getPublicIdFromUrl(dataproducts.Image);
      const deleImage = await deleteImage(publicId);
      const data = await products.findOneAndDelete({ _id: id });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const dataproducts = await products.findById({ _id: id });
      const publicId = getPublicIdFromUrl(dataproducts.Image);
      const deleImage = await deleteImage(publicId);
      const updatedData = {
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Description,
        Image: req.file.path,
        count: req.body.count,
        Category: req.body.Category,
      };
      const data = await products.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async findProducts(req, res, next) {
    try {
      const name = req.params.name;
      console.log(name);
      const data = await products.find({ Name: name });
      res.status(200).json(data);
      console.log(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async findCategory(req, res, next) {
    try {
      const nameCate = req.params.name;
      const newdata = await products.find({ Category: nameCate });
      res.status(200).json(newdata);
      console.log(nameCate);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new ProductsControllnes();
