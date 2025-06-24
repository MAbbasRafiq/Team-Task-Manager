const bcrypt = require('bcryptjs');
const passport = require('passport');
const { validationResult } = require('express-validator');
const userModel = require('../models/userModel');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  try {
    const existingUser = await userModel.findByUsername(username);
    if (existingUser) return res.status(409).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await userModel.createUser(username, hashedPassword);

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: 'Error logging in after registration' });
      res.json({ id: user.id, username: user.username });
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ id: user.id, username: user.username });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
};

exports.me = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  res.json({ id: req.user.id, username: req.user.username });
};
