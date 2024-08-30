import Order from '../models/orderModel.js';
import Book from '../models/bookModel.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { books, tax, guest } = req.body;

    // Calculate total price
    let totalPrice = 0;

    const orderItems = await Promise.all(books.map(async (item) => {
      const book = await Book.findById(item.book);
      if (!book) {
        throw new Error(`Book with ID ${item.book} not found`);
      }

      const price = book.price * item.quantity;
      totalPrice += price;
      
      return {
        book: item.book,
        quantity: item.quantity,
        price: book.price
      };
    }));

    totalPrice += tax; // Add tax to the total price

    const order = new Order({
      customer: req.user ? req.user._id : null, // If the user is logged in
      guest: !req.user ? guest : null, // If the user is a guest
      books: orderItems,
      tax,
      totalPrice
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders (Admin functionality)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('books.book'); // Populate the book details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('books.book');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
