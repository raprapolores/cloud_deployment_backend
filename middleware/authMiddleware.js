const jwt = require('jsonwebtoken');
const db = require('../models/db');

const protect = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

const admin = (req, res, next) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [req.user.userId], (err, results) => {
    if (err || !results.length || results[0].role !== 'admin') {
      return res.status(403).json({ message: 'Admin resources only' });
    }
    next();
  });
};

module.exports = { protect, admin };