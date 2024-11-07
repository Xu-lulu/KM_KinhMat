const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "60000s",
  });
const generateRefreshToken = (user) =>
  jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "7d",
  });
module.exports = { generateAccessToken, generateRefreshToken };
