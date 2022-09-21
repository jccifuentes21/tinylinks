// auth functions
const users = require('../models/users.json')
const bcrypt = require('bcrypt')

const showLogin = (req, res) => {
  if (req.session.email) {
    res.redirect("/urls");
  } else {
    res.render("login", { title: "Login" });
  }
};

const showRegister = (req, res) => {
  if (req.session.username) {
    res.redirect("/urls"); 
  } else {
    res.render("register", { title: "Register" });
  }
};

const registerUser = async (req, res) =>{
  const {name, email, password} = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      name,
      email,
      password: hashedPassword
    }
    users[newUser.email] = newUser
    console.log(users)
    res.redirect('/urls')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  showLogin,
  showRegister,
  registerUser
};
