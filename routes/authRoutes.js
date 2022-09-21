const express = require("express");
const authController = require('../controllers/authController')

const router = express.Router();

router.get("/login", authController.showLogin);

router.get('/register', authController.showRegister);

router.post("/login", );
router.post("/register", authController.registerUser);
router.post("/logout");

module.exports = router;
