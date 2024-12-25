const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err.message });
  }
});

// Getting all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find().select('-password'); // password from ansver
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching users', details: err.message });
    }
  });

module.exports = router;