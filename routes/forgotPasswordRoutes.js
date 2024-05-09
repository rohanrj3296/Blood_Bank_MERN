const express = require("express");
const router = express.Router();
const {
  emailGenerationController,
  otpVerificationController,
} = require("../controllers/forgotPasswordController");

router.post("/sendOTP", emailGenerationController);
router.post("/verifyOTP", otpVerificationController);

module.exports = router;
