const express = require('express');
const { getBooks, addBook, updateBook, deleteBook, borrowBook, returnBook } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getBooks);
router.post('/', protect, admin, addBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, admin, deleteBook);
router.post('/borrow', protect, borrowBook);
router.post('/return', protect, returnBook);

module.exports = router;