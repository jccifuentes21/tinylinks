const express = require("express");
const router = express.Router();

const {
	postNewUrl,
	showUrls,
	deleteUrl,
	showNewUrl,
    showSingleUrl,
    editUrl,
} = require("../controllers/urls");

router.post("/urls/new", postNewUrl);
router.get("urls/new", showNewUrl);
router.get("/urls", showUrls);
router.get("/", showUrls);
router.post("/delete/:id", deleteUrl);
router.get("/url/:id", showSingleUrl);
router.post("/url/:id", editUrl);


module.exports = router;
