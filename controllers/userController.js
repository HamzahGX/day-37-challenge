// controllers/userController.js
const userModel = require('../models/user');
const passport = require('passport');

function renderRegisterPage(req, res) {
  res.render('register');
}

async function registerUser(req, res) {
  const { username, password } = req.body;

  const newUser = await userModel.createUser(username, password);

  if (!newUser) {
    return res.render('register', { error: 'Username already exists' });
  }

  // User registered successfully, handle redirects
}

function renderLoginPage(req, res) {
  res.render('login', { error: null });
}

function login(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
}

module.exports = {
  renderRegisterPage,
  registerUser,
  renderLoginPage,
  login,
};
