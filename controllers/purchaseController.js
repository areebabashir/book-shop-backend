import Purchase from '../models/purchaseModel.js';

// Create a new purchase
export const createPurchase = async (req, res) => {
  try {
    const { supplier, book, quantity, price } = req.body;
    const totalCost = quantity * price;

    const purchase = new Purchase({
      supplier,
      book,
      quantity,
      price,
      totalCost
    });

    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all purchases
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('supplier book');
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
