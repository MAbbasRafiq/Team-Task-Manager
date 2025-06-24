const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 3 }),
  body('password').isLength({ min: 6 })
], authController.register);

router.post('/login', [
  body('username').notEmpty(),
  body('password').notEmpty()
], authController.login);

router.post('/logout', authController.logout);

router.get('/me', authController.me);

module.exports = router;
