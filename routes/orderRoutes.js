import express from 'express';
import {
  createOrder,
  
  getAllOrders,
  getOrderById,
  
} from '../controllers/orderController.js';

const router = express.Router();

// Define routes for order management
router.post('/create', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);

export default router;
