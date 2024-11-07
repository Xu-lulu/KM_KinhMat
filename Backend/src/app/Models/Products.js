const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    Brand: {
      type: String,
      require: true,
    },
    Price: {
      type: String,
      require: true,
    },
    Description: {
      type: String,
      require: true,
    },
    variants: [
      {
        color: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
      },
    ],
    ImageMain: {
      type: String,
      require: true,
    },
    Images: {
      type: Array,
    },
    Count: {
      type: String,
      require: true,
    },
    Category: {
      type: String,
      require: true,
    },
    Status: {
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
module.exports = mongoose.model("Products", Products);
