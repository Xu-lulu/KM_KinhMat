const CategoryController = require("../app/Controllers/CategoryController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();

router.post(
  "/updatacategory",
  verifyTokenAndAdmin,
  CategoryController.updataCategory
);
router.put(
  "/editcategory/:id",
  verifyTokenAndAdmin,
  CategoryController.editCategory
);
router.delete(
  "/deletecategory/:id",
  verifyTokenAndAdmin,
  CategoryController.deleteCategory
);

router.get("/allCategory", CategoryController.allCategory);
// router.post("/products/category/:name", CategoryController.findCategory);
module.exports = router;
