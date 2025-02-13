const testController = require("../app/Controllers/LocationController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndSeller,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();
// router.get(
//   "/bank/allBank",
//   verifyTokenAndUserAuthorization,
//   BankController.alldataBank
// );
router.get("/Provinces", testController.getProvinces);
router.post("/Districts/:id", testController.getDistricts);
router.post("/Wards/:id", testController.getWards);

module.exports = router;
