const { validationResult } = require("express-validator");
const Expense = require("../models/Expense");

async function getAllExpenses(req, res, next) {
  let userId = req.body.userId;
  let data = await Expense.find({ userId });
  if (!data) {
    data = [];
  }
  return res.json({ success: true, status: "data fetched", data: data });
}

async function getExpensesByDate(req, res, next) {
  let year = req.params.date;
  year = Number(year);
  if (isNaN(year)) {
    return res.status(400).json({ sucess: false, status: "Invalid year" });
  } else if (year < 2000 || year > 2050) {
    return res
      .status(400)
      .json({ sucess: false, status: "Enter a year between 2000 and 2050" });
  }
  let userId = req.body.userId;
  let data = await Expense.find(
    {
      $and: [
        { userId: { $eq: userId } },
        {
          $and: [
            { date: { $gte: `${year}-01-01T00:00:00.000+00:00` } },
            { date: { $lte: `${year}-12-31T00:00:00.000+00:00` } },
          ],
        },
      ],
    },
    { userId: 0 }
  );
  if (!data) {
    data = [];
  }
  return res.json({ success: true, status: "data fetched", data: data });
}

async function add(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, status: errors.errors[0].msg });
  }
  let year = new Date(req.body.date).getFullYear();
  if (year < 2000 || year > 2050) {
    return res
      .status(400)
      .json({ sucess: false, status: "Enter a year between 2000 and 2050" });
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

module.exports = { add, remove, getAllExpenses, getExpensesByDate };
