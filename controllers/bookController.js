const bookModel = require('../models/book');

const getBooks = (req, res) => {
  bookModel.getBooks((err, books) => {
    if (err) return res.status(500).json({ message: 'Error retrieving books' });
    res.status(200).json(books);
  });
};

const addBook = (req, res) => {
  const { title, author } = req.body;
  bookModel.addBook(title, author, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error adding book' });
    res.status(201).json({ message: 'Book added successfully' });
  });
};

const updateBook = (req, res) => {
  const { id, title, author } = req.body;
  bookModel.updateBook(id, title, author, (err, results) => {
    if (err) {
        console.error('Error updating book:', err); // Log error if any
        return callback(err, null);
      }
  
    if (err) return res.status(500).json({ message: 'Error updating book' });
    res.status(200).json({ message: 'Book updated successfully' });
  });
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  bookModel.deleteBook(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error deleting book' });
    res.status(200).json({ message: 'Book deleted successfully' });
  });
};

const borrowBook = (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.userId;
  bookModel.borrowBook(bookId, userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error borrowing book' });
    res.status(200).json({ message: 'Book borrowed successfully' });
  });
};

const returnBook = (req, res) => {
  const { bookId } = req.body;
  bookModel.returnBook(bookId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error returning book' });
    res.status(200).json({ message: 'Book returned successfully' });
  });
};

module.exports = { getBooks, addBook, updateBook, deleteBook, borrowBook, returnBook };
