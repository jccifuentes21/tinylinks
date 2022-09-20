const express = require("express");
const router = express.Router;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { postNewUrl, showUrls } = require("./controllers/urls");
const fs = require("fs");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});

app.get("/newUrl", (req, res) => {
	res.render("newUrl", { title: "New Url" });
});

app.get("/register", (req, res) => {
	res.render("register", { title: "Register" });
});

app.get("/singleUrl", (req, res) => {
	res.render("singleUrl", { title: "Url" });
});

app.post("/newUrl", postNewUrl);
app.get("/urls", showUrls);
app.get("/", showUrls);
