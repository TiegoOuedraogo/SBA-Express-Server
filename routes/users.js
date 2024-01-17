const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator'); // Input validation

// Route to register a new user
router.post('/register', [
  // Validate and sanitize fields.
  body('username', 'Username is required').trim().isLength({ min: 3 }),
  body('email', 'Invalid email').isEmail().normalizeEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return the first error as a flash message
    req.flash('error_msg', errors.array()[0].msg);
    return res.redirect('/register');
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/register');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
