const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);
app.set("view engine", "ejs");

app.use("/urls", urlRoutes);
app.get("/", (req, res) => {
	res.redirect("/urls");
});
