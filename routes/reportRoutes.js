import express from 'express';
import {
  calculateRevenue,
  calculateExpenses,
  calculateProfit,
  generateReport
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/revenue', calculateRevenue);
router.get('/expenses', calculateExpenses);
router.get('/profit', calculateProfit);
router.get('/report', generateReport); // Pass year and month in query params

export default router;
