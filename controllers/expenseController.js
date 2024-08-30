import Expense from '../models/expenseModel.js';

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    const { category, amount, description } = req.body;

    const expense = new Expense({
      category,
      amount,
      description
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
