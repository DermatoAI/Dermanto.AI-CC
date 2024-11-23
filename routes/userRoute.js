const express = require("express");
const router = express.Router();
const { getUserProfile, signupWithGoogle, loginWithGoogle } = require("../controllers/authController");
const verifyToken = require("../middlewares/auth");

router.post("/signup-google", signupWithGoogle);  
router.post("/login-google", loginWithGoogle);    

module.exports = router;
