const express = require("express");
const router = express.Router();

const { postNewUrl, showUrls, deleteUrl, showNewUrl } = require("../controllers/urls");

router.post("/urls/new", postNewUrl);
router.get("urls/new", showNewUrl);
router.get("/urls", showUrls);
router.get("/", showUrls);
router.post("/delete/:id", deleteUrl);

module.exports = router;
