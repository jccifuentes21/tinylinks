// urls functions
const fs = require("fs");
const urls = require("../models/urls.json");

const postNewUrl = async (req, res) => {
	const body = req.body;
	const generatedId = generateRandomString(6);
	fs.readFile("./models/urls.json", "utf-8", (err, data) => {
		const userData = JSON.parse(data.toString());
		userData[generatedId] = { shortUrl: generatedId, ...req.body };
		fs.writeFile("./models/urls.json", JSON.stringify(userData), (err) => {
			if (err) {
				console.log(err);
			}
		});
	});
	res.redirect("/urls");
};

const generateRandomString = (myLength) => {
	const chars =
		"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
	const randomArray = Array.from(
		{ length: myLength },
		(v, k) => chars[Math.floor(Math.random() * chars.length)]
	);

	const randomString = randomArray.join("");
	return randomString;
};

const showUrls = (req, res) => {
	res.render("urls", { title: "Urls", urls: Object.values(urls) });
};

module.exports = { postNewUrl, showUrls };
