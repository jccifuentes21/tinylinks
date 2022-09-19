const express = require("express");
const router = express.Router();

const { postNewUrl } = require("../controllers/urls");

router.post("/newUrl", postNewUrl);


module.exports = router;