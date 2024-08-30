import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['rent', 'salaries', 'utilities', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  expenseDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Expense', ExpenseSchema);
