const Bank = require("../Models/Bank");
const asyncHandle = require("express-async-handler");

const CreateBank = asyncHandle(async (req, res, next) => {
  const { Bankname, Bankaccountname, Banknumber } = req.body;
  let bank = await Bank.findOne({ Bankname });
  if (!bank) {
    bank = new Bank({ Bankname });
  }
  const existingAccount = bank.Bankaccounts.find(
    (account) => account.Banknumber === parseInt(Banknumber)
  );
  if (existingAccount) {
    return res.status(400).json({ error: "số tài khoản đã tồn tại" });
  }
  bank.Bankaccounts.push({ Bankaccountname, Banknumber });
  await bank.save();
  return res.status(200).json(bank);
});
const alldataBank = asyncHandle(async (req, res, next) => {
  const dataBank = await Bank.find();
  return res.status(200).json(dataBank);
});
module.exports = { alldataBank, CreateBank };
