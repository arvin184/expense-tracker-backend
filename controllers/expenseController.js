const { validationResult } = require("express-validator");
const Expense = require("../models/Expense");

async function add(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  let obj = {
    title: req.body.title,
    price: req.body.price,
    date: req.body.date,
    userId: req.body.userId,
  };
  let expense = await Expense.create(obj);

  return res.json({ success: true, status: "expense added", data: expense });
}

async function remove(req, res, next) {
  let user_id = req.body.userId;
  let expense = await Expense.findById(req.body.id);
  if (!expense || expense.userId.toString() !== user_id) {
    return res.status(404).json({ success: false, status: "Invalid id" });
  }
  expense.remove();
  return res.json({ success: true, status: "Expense deleted." });
}

module.exports = { add, remove };
