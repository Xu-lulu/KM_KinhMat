const HomeController = require("../app/Controllers/HomeController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();
router.post("/auth/Register", HomeController.Register);
router.post("/auth/Login", HomeController.Login);
router.post("/auth/refresh", HomeController.requestRefereshToken);
router.get(
  "/auth/oneuser",
  verifyTokenAndUserAuthorization,
  HomeController.OneUsers
);

router.get(
  "/auth/allCartOneUser",
  verifyTokenAndUser,
  HomeController.datacartOneUser
);
router.get("/auth/alluser", verifyTokenAndAdmin, HomeController.allUser);
router.post(
  "/auth/Logout",
  verifyTokenAndUserAuthorization,
  HomeController.logOut
);
module.exports = router;
