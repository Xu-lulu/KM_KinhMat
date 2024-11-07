const HomeController = require("../app/Controllers/HomeController");

const router = require("express").Router();

router.get("/", HomeController.home);

module.exports = router;
