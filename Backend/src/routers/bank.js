const BankController = require("../app/Controllers/BankControllner");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();
router.get(
  "/allBank",
  verifyTokenAndUserAuthorization,
  BankController.alldataBank
);
router.post("/createBank", verifyTokenAndAdmin, BankController.CreateBank);
module.exports = router;
