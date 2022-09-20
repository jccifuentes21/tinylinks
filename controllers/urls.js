// urls functions

const postNewUrl = async (req, res) => {
  const body = req.body;
  const generatedId = generateRandomString(6);
  console.log("body", body);
  const newUrl = { ...req.body, id: generatedId, shortUrl: generatedId };
  console.log("newUrl", newUrl);
  res.render("urls", { title: 'Urls'});
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


module.exports = { postNewUrl };
