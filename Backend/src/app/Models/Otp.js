const mongoose = require("mongoose");

const OtpUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    time: { type: Date, default: Date.now, index: { expires: 20 } },
  },
  { collection: "otp" }
);
module.exports = mongoose.model("OtpUser", OtpUserSchema);
