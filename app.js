const express = require("express");
const cookieSession = require('cookie-session')
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.static("./public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use("/auth", authRoutes);
app.use("/urls", urlRoutes);


app.get("/", (req, res) => {
  let isLoggedIn;
  let user
  if(req.session.user){
    isLoggedIn = true
    user = req.session.user
    res.redirect('/urls')
  } else {
    isLoggedIn = false
    res.redirect('/auth/login')
  }
});

app.listen(3000);