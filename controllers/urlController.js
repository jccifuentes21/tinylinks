// urls functions
const fs = require("fs");

const postNewUrl = async (req, res) => {
	const generatedId = generateRandomString(6);
	fs.readFile("./models/urls.json", "utf-8", (err, data) => {
		const userData = JSON.parse(data.toString());
		userData[generatedId] = { shortUrl: generatedId, ...req.body };
		fs.writeFile("./models/urls.json", JSON.stringify(userData), (err) => {
			if (err) {
				console.log(err);
			}
			res.redirect("/urls");
		});
	});
};

const deleteUrl = (req, res) => {
	fs.readFile("./models/urls.json", "utf-8", (err, data) => {
		const userData = JSON.parse(data.toString());
		delete userData[req.params.id];
		fs.writeFile("./models/urls.json", JSON.stringify(userData), (err) => {
			if (err) {
				console.log(err);
			}
			res.redirect("/urls");
		});
	});
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
	fs.readFile("./models/urls.json", (err, data) => {
		const urls = JSON.parse(data);
		res.render("urls", { title: "Urls", urls: Object.values(urls) });
	});
};

const showNewUrl = (req, res) => {
	res.render("newUrl", { title: "New Url" });
};

const showSingleUrl = (req, res) => {
	const data = JSON.parse(fs.readFileSync("./models/urls.json", "utf8"));
	res.render("singleUrl", {
		title: "Url",
		id: req.params.id,
		long: data[req.params.id].longUrl,
	});
};

const editUrl = (req, res) => {
	fs.readFile("./models/urls.json", "utf-8", (err, data) => {
		const userData = JSON.parse(data.toString());
		userData[req.params.id].longUrl = req.body.longUrl;
		fs.writeFile("./models/urls.json", JSON.stringify(userData), (err) => {
			if (err) {
				console.log(err);
			}
			res.redirect("/urls");
		});
	});
};

const getLongUrl = (req, res) => {
	const url = JSON.parse(fs.readFileSync("./models/urls.json", "utf8"));
	return url[req].longUrl;
};

const shortedUrl = (req, res) => {
	const shortedUrl = getLongUrl(req.params.id);
	res.redirect(shortedUrl);
}

module.exports = {
	postNewUrl,
	showUrls,
	deleteUrl,
	showNewUrl,
	showSingleUrl,
	editUrl,
	getLongUrl,
	shortedUrl,
};
