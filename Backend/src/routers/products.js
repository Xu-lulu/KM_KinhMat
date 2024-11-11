const router = require("express").Router();
const ProductsControllers = require("../app/Controllers/ProductsCotrollers");
const uploadCloud = require("../config/cloudinary.config.");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndSeller,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");

router.post(
  "/createProducts",
  verifyTokenAndAdmin,
  uploadCloud.fields([
    { name: "Image", maxCount: 1 },
    { name: "setFileListImage", maxCount: 5 },
  ]),
  ProductsControllers.createProducts
);
router.get("/allproducts", ProductsControllers.allProducts);
router.get(
  "/productsadmin",
  verifyTokenAndUserAuthorization,
  ProductsControllers.allProductsAdmin
);

router.delete("/delete/:id", verifyTokenAndAdmin, ProductsControllers.delete);
router.put(
  "/update/:id",
  verifyTokenAndAdmin,
  uploadCloud.fields([
    { name: "Image", maxCount: 1 },
    { name: "setFileListImage", maxCount: 5 },
  ]),
  ProductsControllers.update
);
router.post(
  "/dataupdate/:id",
  verifyTokenAndAdmin,
  ProductsControllers.dataupdate
);
router.post("/search/:name", ProductsControllers.findProducts);
router.post("/category/:name", ProductsControllers.findCategory);

module.exports = router;
