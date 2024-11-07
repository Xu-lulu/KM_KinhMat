import asyncHandle from "express-async-handler";
const Seller = require("../Models/Seller");
const Bank = require("../Models/Bank");
const CreateSeller = asyncHandle(async (req, res, next) => {
  const { idUser, nameOwner, nameStore, addressStore, phoneStore, payStore } =
    req.body;
  const Owner = await Seller.findOne({ nameOwner });
  const NameStore = await Seller.findOne({ nameStore });
  const addr = await Seller.findOne({ addressStore });
  const phone = await Seller.findOne({ phoneStore });
  const pay = await Seller.findOne({ payStore });
  if (Owner) {
    return res.status(400).json({ error: "Tên chủ cửa hàng đã được đăng ký!" });
  }
  if (NameStore) {
    return res.status(400).json({ error: "Tên cửa hàng đã được đăng ký!" });
  }
  if (phone) {
    return res
      .status(400)
      .json({ error: "Số điện thoại cửa hàng đã được đăng ký!" });
  }
  if (pay) {
    return res.status(400).json({
      error: "Số tài khoản đã được đăng ký cửa hàng đã được đăng ký!",
    });
  }
  const data = new Seller({
    nameOwner: Owner,
    nameStore: NameStore,
    addressStore: addr,
    phoneStore: phone,
    payStore: pay,
    user: idUser,
  });
  await data.save();
  return res.status(200).json(data);
});
module.exports = {
  CreateSeller,
};
