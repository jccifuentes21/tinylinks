const express = require("express");
const router = express.Router();

const { postNewUrl, showUrls, deleteUrl } = require("../controllers/urls");

router.post("/newUrl", postNewUrl);
router.get("/urls", showUrls);
router.post("/delete/:id", deleteUrl);

module.exports = router;
