const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../app/models/user');

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;