const jwt = require("jsonwebtoken");
const asyncHandle = require("express-async-handler");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        console.error("Lỗi xác thực JWT:", err);
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role) {
      next();
      console.log("adminanduser");
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "user") {
      console.log("user");
      next();
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      console.log("admin");
      next();
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndSeller = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "seller") {
      console.log("seller");
      next();
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndSeller,
  verifyTokenAndUserAuthorization,
};
