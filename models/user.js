const bcrypt = require('bcryptjs');
const db = require('./db');

const registerUser = (username, email, password, role, callback) => {
    const query = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
    db.query(query, [username, email, password, role], callback);
};

const findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], callback);
};

const comparePasswords = (plainPassword, hashedPassword, callback) => {
  bcrypt.compare(plainPassword, hashedPassword, callback);
};

module.exports = { registerUser, findUserByEmail, comparePasswords };