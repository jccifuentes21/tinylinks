const express = require("express");
const router = express.Router();

const { postNewUrl, showUrls } = require("../controllers/urls");

router.post("/newUrl", postNewUrl);
router.get("/urls", showUrls);

module.exports = router;
