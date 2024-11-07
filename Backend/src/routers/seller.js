const BankController = require("../app/Controllers/BankControllner");
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
router.post("/bank/createBank", verifyTokenAndAdmin, BankController.CreateBank);
module.exports = router;
