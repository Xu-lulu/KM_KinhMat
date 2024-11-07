const mongoose = require("mongoose");

const Category = new mongoose.Schema(
  {
    Namecategory: {
      type: String,
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deleteAt: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", Category);
