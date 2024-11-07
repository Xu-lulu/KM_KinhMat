const mongoose = require("mongoose");

const Seller = new mongoose.Schema({
  nameOwner: {
    type: String,
    required: true,
  },
  nameStore: {
    type: String,
    required: true,
  },
  addressStore: {
    type: String,
    required: true,
  },
  phoneStore: {
    type: String,
    required: true,
  },
  payStore: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Seller", Seller);
