const express = require("express");
const router = express.Router;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { postNewUrl, showUrls, deleteUrl } = require("./controllers/urls");
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
app.post("/delete/:id", deleteUrl);


// app.post("/delete/:id", (req, res) => {
//   fs.readFile("./models/urls.json", "utf-8", (err, data) => {
//     const userData = JSON.parse(data.toString());
//     delete userData[req.params.id];
//     fs.writeFile("./models/urls.json", JSON.stringify(userData), (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });
//   res.redirect("/urls");
// });