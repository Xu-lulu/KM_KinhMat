"use strict";

var HomeController = require("../app/Controllers/HomeController");

var _require = require("../middleware/verifyToken"),
    verifyToken = _require.verifyToken,
    verifyTokenAndAdmin = _require.verifyTokenAndAdmin,
    verifyTokenAndUser = _require.verifyTokenAndUser,
    verifyTokenAndUserAuthorization = _require.verifyTokenAndUserAuthorization;

var router = require("express").Router();

router.post("/Register", HomeController.Register);
router.post("/Login", HomeController.Login);
router.get("/oneuser", verifyTokenAndUserAuthorization, HomeController.OneUsers);
router.get("/alluser", verifyTokenAndAdmin, HomeController.allUser);
router.post("/Logout", verifyTokenAndUserAuthorization, HomeController.logOut);
module.exports = router;