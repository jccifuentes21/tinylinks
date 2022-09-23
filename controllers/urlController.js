// urls functions
const fs = require("fs");

const postNewUrl = async (req, res) => {
  if (req.session.user) {
    const generatedId = generateRandomString(6);
    fs.readFile("./models/urls.json", "utf-8", (err, data) => {
      const userData = JSON.parse(data.toString());
      userData[req.session.user.id] = {
        ...userData[req.session.user.id],
        [generatedId]: { shortUrl: generatedId, ...req.body },
      };
      fs.writeFile("./models/urls.json", JSON.stringify(userData), (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/urls");
      });
    });
  } else {
    res.render("ErrPage", {
      title: "Error!",
      message: "Please log in to view this page",
      isLoggedIn: false,
    });
  }
};

const deleteUrl = (req, res) => {
  if (req.session.user) {
    fs.readFile("./models/urls.json", "utf-8", (err, data) => {
      const allData = JSON.parse(data.toString());
      const userData = allData[req.session.user.id];
      delete userData[req.params.id];
      allData[req.session.user.id] = userData;
      fs.writeFile("./models/urls.json", JSON.stringify(allData), (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/urls");
      });
    });
  } else {
    res.render("ErrPage", {
      title: "Error",
      message: "Please login to view this page!",
      isLoggedIn: false,
    });
  }
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
    let userUrls;
    if (req.session.user) {
      if (urls[req.session.user.id]) {
        userUrls = Object.values(urls[req.session.user.id]);
      } else {
        userUrls = [];
      }
      res.render("urls", {
        title: "Urls",
        urls: userUrls,
        isLoggedIn: true,
        user: req.session.user,
      });
    } else {
      res.render("ErrPage", {
        title: "Error",
        message: "Please login to view this page!",
        isLoggedIn: false,
      });
    }
  });
};

const showNewUrl = (req, res) => {
  if (req.session.user) {
    res.render("newUrl", {
      title: "New Url",
      isLoggedIn: true,
      user: req.session.user,
    });
  } else {
    res.redirect("/auth/login");
  }
};

const showSingleUrl = (req, res) => {
  if (req.session.user) {
    const data = JSON.parse(fs.readFileSync("./models/urls.json", "utf8"));
    const userData = data[req.session.user.id];
    res.render("singleUrl", {
      title: "Url",
      id: req.params.id,
      long: userData[req.params.id].longUrl,
      user: req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.render("ErrPage", {
      title: "Error",
      message: "Please log in to view this page",
      isLoggedIn: false,
    });
  }
};

const editUrl = (req, res) => {
  if (req.session.user) {
    fs.readFile("./models/urls.json", "utf-8", (err, data) => {
      const allData = JSON.parse(data.toString());
      const userData = allData[req.session.user.id];
      userData[req.params.id].longUrl = req.body.longUrl;
      allData[req.session.user.id] = userData;
      fs.writeFile("./models/urls.json", JSON.stringify(allData), (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/urls");
      });
    });
  } else {
    res.render("ErrPage", {
      title: "Error!",
      message: "Please log in to view this page",
      isLoggedIn: false,
    });
  }
};

const getLongUrl = (shortedUrl, userId) => {
  const allData = JSON.parse(fs.readFileSync("./models/urls.json", "utf8"));
  const url = allData[userId];
  let returnUrl;
  if (url[shortedUrl]) {
    if (
      url[shortedUrl].longUrl.startsWith("http://") ||
      url[shortedUrl].longUrl.startsWith("https://")
    ) {
      return url[shortedUrl].longUrl;
    } else {
      return `//${url[shortedUrl].longUrl}`
    }
  } else {
    return false;
  }
};

const shortedUrl = (req, res) => {
  if (req.session.user) {
    const shortedUrl = getLongUrl(req.params.id, req.session.user.id);
    if (shortedUrl === false) {
      res.status(404).send("Error! This ID does not exist!");
    } else {
      res.redirect(shortedUrl);
    }
  } else {
    res.render("ErrPage", {
      title: "Error!",
      message: "Please log in to view this page",
      isLoggedIn: false,
    });
  }
};

module.exports = {
  postNewUrl,
  showUrls,
  deleteUrl,
  showNewUrl,
  showSingleUrl,
  editUrl,
  shortedUrl,
};
