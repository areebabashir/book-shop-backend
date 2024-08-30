import express from 'express';
import { createBook, updateBook, getAllBooks, getBookById, deleteBook } from '../controllers/bookController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Create a new book with image upload
router.post('/create', upload.single('image'), createBook);

// Update a book with image upload
router.put('/update/:id', upload.single('image'), updateBook);

// Other routes
router.get('/getAllBooks', getAllBooks);
router.get('/getBookById/:id', getBookById);
router.delete('/deleteBook/:id', deleteBook);

export default router;
