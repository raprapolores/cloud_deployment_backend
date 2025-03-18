const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if the email already exists
  userModel.findUserByEmail(email, (err, results) => {
    if (err || results.length) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving
      // Insert the new user into the database
      userModel.registerUser(username, email,password, role, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error registering user' });
        res.status(201).json({ message: 'User registered successfully' });
      });
  });
};

// User Login (already exists)
const loginUser = (req, res) => {
    const { email, password } = req.body;
  userModel.findUserByEmail(email, (err, results) => {
    if (password != results[0].password) return res.status(400).json({ message: 'Invalid credentials' });
      if (err) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { userId: results[0].id, role: results[0].role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token,  role: results[0].role});
    });
};

module.exports = { registerUser, loginUser };