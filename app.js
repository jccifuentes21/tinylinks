const express = require("express");
const bcrypt = require("bcrypt");
const cookieSession = require('cookie-session')
const authRoutes = require("./routes/authRoutes");
const morgan = require('morgan')

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.static("./public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use("/auth", authRoutes);

app.listen(3000);

app.get("/", (req, res) => {
  res.render("urls", { title: "Urls" });
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

app.get("/urls", (req, res) => {
  res.render("urls", { title: "Urls" });
});
