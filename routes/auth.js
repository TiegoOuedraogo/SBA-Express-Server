const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Serve the registration form
router.get('/register', (req, res) => {
    res.render('auth/register', { layout: 'layouts/main' });
});

// Handle registration form submission
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('Email already in use.');
        }

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('Username already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
});

// Serve the login form
router.get('/login', (req, res) => {
    res.render('auth/login', { layout: 'layouts/main' });
});

// Handle login form submission
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // User is now considered logged in, handle accordingly
        // For example, you can redirect the user to the home page or their dashboard
        res.redirect('/'); // Redirect to home page after successful login
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

module.exports = router;
