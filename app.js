const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
	postNewUrl,
	showUrls,
	deleteUrl,
	showNewUrl,
  showSingleUrl,
  editUrl,
  getLongUrl
} = require("./controllers/urls");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});

app.get("/register", (req, res) => {
	res.render("register", { title: "Register" });
});

app.get("/urls/new", showNewUrl), app.post("/urls/new", postNewUrl);
app.get("/urls", showUrls);
app.get("/", showUrls);
app.post("/delete/:id", deleteUrl);
app.get("/urls/:id", showSingleUrl);
app.post("/urls/:id", editUrl);
app.get("/urls/u/:id", (req, res) => {
  const shortedUrl = getLongUrl(req.params.id);
  res.redirect(shortedUrl);
});


