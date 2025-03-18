const db = require('./db');

const getBooks = (callback) => {
  const query = 'SELECT * FROM books';
  db.query(query, callback);
};

const addBook = (title, author, callback) => {
  const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
  db.query(query, [title, author], callback);
};

const updateBook = (id, title, author, callback) => {
  const query = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
  db.query(query, [title, author, id], callback);
};

const deleteBook = (id, callback) => {
  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [id], callback);
};

const borrowBook = (bookId, userId, callback) => {
  const query = 'UPDATE books SET available = ?, borrowed_by = ? WHERE id = ?';
  db.query(query, [false, userId, bookId], callback);
};

const returnBook = (bookId, callback) => {
  const query = 'UPDATE books SET available = ?, borrowed_by = NULL WHERE id = ?';
  db.query(query, [true, bookId], callback);
};

module.exports = { getBooks, addBook, updateBook, deleteBook, borrowBook, returnBook };