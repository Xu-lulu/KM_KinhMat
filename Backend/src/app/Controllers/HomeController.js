const bcrypt = require("bcrypt");
const Users = require("../Models/Users");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middleware/token/jwt");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");

//Controller//
const Register = asyncHandle(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({
      sucess: false,
      mes: "Hãy nhập đầy đủ thông tin",
    });
  }
  const hansed = await bcrypt.hash(req.body.password, salt);
  const DataUsers = await new Users({
    username: req.body.username,
    password: hansed,
    email: req.body.email,
  });
  const checkuser = await Users.findOne({ username: DataUsers.username });
  const checkemail = await Users.findOne({ email: DataUsers.email });
  if (checkuser || checkemail) {
    return res.status(400).json({
      sucess: false,
      mes: "Tài khoản hoặc email đã được dùng",
    });
  }
  if (req.body.password.length <= 8) {
    return res.status(400).json({
      sucess: false,
      mes: "Độ dài mật khẩu phải hơn 8 ký tự!!!",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      sucess: false,
      mes: "Email không hợp lệ!!!",
    });
  } else {
    const users = await DataUsers.save();
    return res.status(200).json({
      sucess: users ? true : false,
      users,
    });
  }
});
const Login = asyncHandle(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      sucess: false,
      mes: "Hãy nhập đầy đủ thông tin",
    });
  }
  const Checkuser = await Users.findOne({
    username,
  });
  if (!Checkuser) {
    return res.status(400).json({
      sucess: false,
      mes: "Incorrect username or password",
    });
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    Checkuser.password
  );
  if (!validPassword) {
    return res.status(400).json({
      sucess: false,
      mes: "Incorrect username or password",
    });
  }
  if (Checkuser && validPassword) {
    const { password, isAdmin, ...newUsers } = Checkuser.toObject();
    const accessToken = generateAccessToken(Checkuser);
    const refreshToken = generateRefreshToken(Checkuser);
    await Users.findByIdAndUpdate(
      Checkuser._id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      mes: "Đăng nhập thành công",
      accessToken,
      refreshToken,
      newUsers,
    });
  } else {
    throw new Error("Tài khoản hoặc mật khẩu không chính xác!!!");
  }
});

const requestRefereshToken = asyncHandle(async (req, res, next) => {
  //Take refresh token from user
  console.log(req.cookies);

  const refreshToken = req.cookies.refreshToken;
  //Send error if token is not valid
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  const storedToken = await Users.findOne({ refreshToken: refreshToken });
  if (!storedToken) {
    return res.status(403).json("Refresh token is not valid");
  }
  jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Xác thực token thất bại");
    }
    // refreshToken = refreshToken.filter((token) => token !== storedToken);
    //create new access token, refresh token and send to user
    // const newAccessToken = generateAccessToken();
    // const newRefreshToken = generateRefreshToken();
    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   path: "/",
    //   sameSite: "strict",
    // });
    const response = await Users.findOne({
      // _id: _id,
      refreshToken: refreshToken,
    });
    const newAccessToken = generateAccessToken(response);

    return res.status(200).json({
      success: response ? user : false,
      accessToken: newAccessToken,
      // refreshToken: newRefreshToken,
    });
  });
});

const OneUsers = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const user = await Users.findById({ _id }).select(
    "-refreshToken -password -role"
  );
  return res.status(200).json({
    success: false,
    rs: user ? user : "kshd",
  });
});
const allUser = asyncHandle(async (req, res) => {
  const user = await Users.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: false,
    rs: user ? user : "kshd",
  });
});
const datacartOneUser = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  // const datacart = await Users.findById({ _id }).select("cart");
  const datacart = await Users.findById({ _id });
  return res.status(200).json({
    datacart,
  });
});
const logOut = asyncHandle(async (req, res, next) => {
  const cookie = req.cookies.refreshToken;
  if (!cookie) return res.status(401).json("You're not authenticated");
  const storedToken = await Users.findOne({ refreshToken: cookie });
  if (!storedToken) {
    return res.status(403).json("Refresh token is not valid");
  }
  await Users.findOneAndUpdate(
    { refreshToken: cookie },
    { $unset: { refreshToken: "" } },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json("Logged out successfully!");
});

const forgotPassword = asyncHandle(async (req, res, next) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await Users.findOne({ email });
  if (!user) throw new Error("User not found");
});
const home = asyncHandle(async (req, res, next) => {
  return res.status(200).json("server chay!");
});
module.exports = {
  Register,
  Login,
  logOut,
  OneUsers,
  allUser,
  datacartOneUser,
  requestRefereshToken,
  home,
};
