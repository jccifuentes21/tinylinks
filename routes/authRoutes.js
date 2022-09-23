const express = require("express");
const {showLogin, showRegister, login, registerUser, logout} = require('../controllers/authController')

const router = express.Router();

router.get("/login", showLogin);

router.get('/register', showRegister);

router.post("/login", login);
router.post("/register", registerUser);
router.post("/logout", logout);

module.exports = router;
