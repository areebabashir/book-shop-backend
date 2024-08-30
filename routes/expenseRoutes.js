import express from 'express';
import { createExpense, getExpenses } from '../controllers/expenseController.js';

const router = express.Router();

// Create a new expense
router.post('/createExpense', createExpense);

// Get all expenses
router.get('/', getExpenses);

export default router;
