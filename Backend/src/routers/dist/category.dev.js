"use strict";

var CategoryController = require("../app/Controllers/CategoryController");

var router = require("express").Router();

router.post("/category", CategoryController.updataCategory);
router.get("/allCategory", CategoryController.allCategory); // router.post("/products/category/:name", CategoryController.findCategory);

module.exports = router;