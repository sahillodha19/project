const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/Models/Users.js'); // Assuming the model for Account is in models/account.js
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, pwd, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      pwd: hashedPassword,
      account_type : 'customer',
      phone
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' + error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, pwd } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
   //  console.log(user);

    // Compare password
    const isMatch = await bcrypt.compare(pwd, user.pwd);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, account_type: user.account_type },
      "process.env.JWT_SECRET",  // Use environment variable for secret
      { expiresIn: '1h' }
    );
    console.log(token);
    return res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get user profile (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-pwd'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'process.env.JWT_SECRET');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = router;
