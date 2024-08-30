import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  supplier: {
    type: "string",
    ref: 'Supplier',
    required: true
  },
  book: {
    type: 'string',
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true // Price per unit
  },
  totalCost: {
    type: Number,
    required: true // Calculated as quantity * price
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Purchase', PurchaseSchema);
