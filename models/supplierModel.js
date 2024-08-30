import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    phone: String,
    email: String,
    address: String
  },
  totalOwed: {
    type: Number,
    default: 0
  },
  totalPaid: {
    type: Number,
    default: 0
  },
  pendingOrders: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      quantity: Number,
      orderDate: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('Supplier', SupplierSchema);
