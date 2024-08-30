import Supplier from '../models/supplierModel.js';

// Create a new supplier
export const createSupplier = async (req, res) => {
  try {
    const { name, contact } = req.body;

    const supplier = new Supplier({
      name,
      contact
    });

    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update supplier payment
export const updateSupplierPayment = async (req, res) => {
  try {
    const { amountPaid } = req.body;
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

    supplier.totalPaid += amountPaid;
    supplier.totalOwed -= amountPaid;

    await supplier.save();
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
