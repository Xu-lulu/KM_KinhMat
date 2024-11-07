const mongoose = require("mongoose");

const BankCardSchema = new mongoose.Schema({
  Bankname: {
    type: String,
    required: true,
  },
  Bankaccounts: [
    {
      Banknumber: {
        type: Number,
        require: true,
      },
      Bankaccountname: [{ type: String, require: true }],
    },
  ],
  // cardHolderName: {
  //   type: String,
  //   required: true,
  // },
  // cardNumber: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
});
module.exports = mongoose.model("Bank", BankCardSchema);

// module.exports = mongoose.model("BankCard", BankCardSchema);
