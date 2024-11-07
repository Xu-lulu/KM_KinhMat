const products = require("../Models/Products");
const Users = require("../Models/Users");
class CartController {
  async addCart(req, res, next) {
    try {
      const userId = req.params.id;
      const addProducttoCart = req.body;
      const user = await Users.findById(userId);
      if (!user) {
        res.status(404).json({ mes: "Người dùng chưa không tồn tại!" });
      } else {
        user.cart.push(addProducttoCart);
        await user.save();
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async upmountCart(req, res, next) {
    try {
      const { _id } = req.user;
      const productId = req.params.id;
      const updatedData = req.body;
      const user = await Users.findById(_id);
      if (!user) {
        res.status(404).json({ mes: "Người dùng không tồn tại!" });
      } else {
        const data = await Users.findOneAndUpdate(
          { _id: _id, "cart._id": productId },
          { $set: { "cart.$": updatedData } },
          { new: true }
        );
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  async deleteOneItem(req, res, next) {
    try {
      const { _id } = req.user;
      const productId = req.params.id;
      const user = await Users.findById(_id);
      if (!user) {
        res.status(404).json({ mes: "Người dùng không tồn tại!" });
      } else {
        const data = await Users.findByIdAndUpdate(
          _id,
          { $pull: { cart: { _id: productId } } },
          { new: true }
        );
        console.log("data", data);
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
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
      const data = await products.findOneAndDelete({ _id: id });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const updatedData = {
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Description,
        Image: req.body.Image,
        count: req.body.count,
        Category: req.body.Category,
      };
      if (req.file) {
        updatedData.Image = req.file.path;
      }
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
module.exports = new CartController();
