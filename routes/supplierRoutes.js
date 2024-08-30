import express from 'express';
import {
  createSupplier,
  getSuppliers,
  updateSupplierPayment,
  getSupplierById
} from '../controllers/supplierController.js';

const router = express.Router();

// Create a new supplier
router.post('/createSupplier', createSupplier);

// Get all suppliers
router.get('/getSuppliers', getSuppliers);

// Get supplier details by ID
router.get('/:id', getSupplierById);

// Update supplier payment
router.put('/:id/payment', updateSupplierPayment);

export default router;
