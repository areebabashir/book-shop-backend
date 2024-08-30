import express from 'express';
import { createPurchase, getPurchases } from '../controllers/purchaseController.js';

const router = express.Router();

// Create a new purchase
router.post('/create', createPurchase);

// Get all purchases
router.get('/', getPurchases);

export default router;
