const express = require("express");
const router = express.Router();

const {
	postNewUrl,
	showUrls,
	deleteUrl,
	showNewUrl,
	showSingleUrl,
	editUrl,
	shortedUrl,
} = require("../controllers/urlController");

router.post("/new", postNewUrl);
router.get("/new", showNewUrl);
router.get("/", showUrls);
router.post("/delete/:id", deleteUrl);
router.get("/url/:id", showSingleUrl);
router.post("/url/:id", editUrl);
router.get("/u/:id", shortedUrl);

module.exports = router;
