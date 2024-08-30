import Order from '../models/orderModel.js';
import Expense from '../models/expenseModel.js';
import Purchase from '../models/purchaseModel.js';

// Calculate total revenue (from sales)
export const calculateRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'cancelled' } });

    let totalRevenue = 0;
    let totalTax = 0;

    orders.forEach(order => {
      totalRevenue += order.totalPrice;
      totalTax += order.tax;
    });

    res.json({
      totalRevenue,
      totalTax,
      totalOrders: orders.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calculate total expenses (operational and book purchases)
export const calculateExpenses = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalOperationalExpenses = expenses[0]?.total || 0;

    const purchases = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: "$totalCost" } } }
    ]);
    const totalBookPurchaseCost = purchases[0]?.total || 0;

    const totalExpenses = totalOperationalExpenses + totalBookPurchaseCost;

    res.json({
      totalOperationalExpenses,
      totalBookPurchaseCost,
      totalExpenses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calculate profit = Revenue - Expenses
export const calculateProfit = async (req, res) => {
  try {
    const revenue = await calculateRevenue(req, res);
    const expenses = await calculateExpenses(req, res);

    const profit = revenue.totalRevenue - expenses.totalExpenses;

    res.json({
      revenue: revenue.totalRevenue,
      expenses: expenses.totalExpenses,
      profit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate Monthly/Yearly report
export const generateReport = async (req, res) => {
  const { year, month } = req.query;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  try {
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    let totalRevenue = 0;
    orders.forEach(order => totalRevenue += order.totalPrice);

    const expenses = await Expense.find({
      expenseDate: { $gte: startDate, $lt: endDate }
    });

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const profit = totalRevenue - totalExpenses;

    res.json({
      totalRevenue,
      totalExpenses,
      profit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
