const CartController = require("../app/Controllers/CartController");
const upload = require("../middleware/uploadImage");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();

router.post(
  "/addtoCart/:id",
  verifyTokenAndUser,
  upload.single("Image"),
  CartController.addCart
);
router.put("/upmountCart/:id", verifyTokenAndUser, CartController.upmountCart);
router.delete(
  "/deleteOneItem/:id",
  verifyTokenAndUser,
  CartController.deleteOneItem
);
module.exports = router;
