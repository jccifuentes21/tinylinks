// urls functions

const postNewUrl = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  const newUrl = { ...req.body};
  console.log("newUrl", newUrl);
  res.redirect("/urls");
};




module.exports = { postNewUrl };
