const express = require("express");
const router = express.Router;

const app = express();

app.listen(3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("urls", { title: 'Urls'});
});

app.get("/login", (req, res) => {
  res.render("login", { title: 'Login'});
});

app.get("/newUrl", (req, res) => {
  res.render("newUrl", { title: 'New Url'});
});

app.get("/register", (req, res) => {
  res.render("register", { title: 'Register'});
});

app.get("/singleUrl", (req, res) => {
  res.render("singleUrl", { title: 'Url'});
});

app.get("/urls", (req, res) => {
  res.render("urls", { title: 'Urls'});
});
