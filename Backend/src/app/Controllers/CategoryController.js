const categos = require("../Models/Category");

class CategoryControllnes {
  async updataCategory(req, res, next) {
    try {
      const newdata = new categos({
        Namecategory: req.body.Namecategory,
      });
      newdata.save();
      return res.status(200).json(newdata);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      const data = await categos.findOneAndDelete({ _id: id });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async editCategory(req, res, next) {
    try {
      const id = req.params.id;
      const updatedData = {
        Namecategory: req.body.Namecategory,
      };
      const data = await categos.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async allCategory(req, res, next) {
    try {
      const newdata = await categos.find();
      return res.status(200).json(newdata);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async findCategory(req, res, next) {
    try {
      const nameCate = req.params.name;
      const newdata = await categos.find({ Namecategory: nameCate });
      return res.status(200).json(newdata);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new CategoryControllnes();
