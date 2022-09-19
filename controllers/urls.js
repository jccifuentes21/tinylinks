// urls functions

const postNewUrl = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  const newUrl = { ...req.body, id: generateRandomString(6),};
  console.log("newUrl", newUrl);
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


module.exports = { postNewUrl };
