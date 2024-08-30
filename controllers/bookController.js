import Book from '../models/bookModel.js';
import { sendStockAlert } from '../utils/sendNotification.js';

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, category, publisher, price, stock, stockThreshold } = req.body;
    const image = req.file ? req.file.path : null; // Get the image path from multer

    const book = new Book({ 
      title, 
      author, 
      ISBN, 
      category, 
      publisher, 
      price, 
      stock, 
      stockThreshold: stockThreshold || 5, // Default threshold of 5 if not provided
      image 
    });
    
    await book.save();

    // Trigger stock alert if stock is below threshold
    if (book.stock <= book.stockThreshold) {
      sendStockAlert(book);
    }

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const { title, author, ISBN, category, publisher, price, stock, stockThreshold } = req.body;
    const image = req.file ? req.file.path : null; // Get the image path from multer

    const book = await Book.findByIdAndUpdate(req.params.id, 
      { 
        title, 
        author, 
        ISBN, 
        category, 
        publisher, 
        price, 
        stock, 
        stockThreshold: stockThreshold || 5, // Update stock threshold if provided
        image 
      }, 
      { new: true, runValidators: true });

    if (!book) return res.status(404).json({ error: 'Book not found' });

    // Trigger stock alert if stock is below threshold
    if (book.stock <= book.stockThreshold) {
      sendStockAlert(book);
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
