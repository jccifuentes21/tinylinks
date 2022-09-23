// auth functions
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const showLogin = (req, res) => {
  if (req.session.user) {
    res.redirect("/urls");
  } else {
    res.render("login", { title: "Login", isLoggedIn: false });
  }
};

const showRegister = (req, res) => {
  if (req.session.user) {
    res.redirect("/urls");
  } else {
    res.render("register", { title: "Register", isLoggedIn: false });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let isNew = true;
  try {
    const usersJSON = await fs.readFile("./models/users.json");
    let users = JSON.parse(usersJSON);

    Object.values(users).forEach((user) => {
      if (user.email === email) {
        console.log("user already registered");
        isNew = false;
      }
    });

    if (isNew) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: uuid.v4(),
        name,
        email,
        password: hashedPassword,
      };
      users[newUser.id] = newUser;
      fs.writeFile("./models/users.json", JSON.stringify(users));
      req.session.user = newUser;
      res.redirect("/urls");
    } else {
      res.render("userRegistered", { title: "Error", isLoggedIn: false });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const usersJSON = await fs.readFile("./models/users.json");
  const users = JSON.parse(usersJSON);
  const selectedUser = Object.values(users).find(
    (user) => user.email === email
  );
  try {
    if (selectedUser) {
      if (await bcrypt.compare(password, selectedUser.password)) {
        req.session.user = selectedUser;
        res.redirect("/urls");
      } else {
        res.render("ErrPage", {
          title: "Login Error",
          message: "Login Error! Please try again",
          isLoggedIn: false,
        });
      }
    } else {
      res.render("ErrPage", {
        title: "Login Error",
        message: "Error! Please try again",
        isLoggedIn: false,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
};

const logout = (req, res) => {
  req.session = null;
  res.redirect("/auth/login");
};

module.exports = {
  showLogin,
  showRegister,
  registerUser,
  login,
  logout,
};
