// ================== handle user expense==================

const express = require("express");
const router = express.Router();

let expenses = []; 
let currentId = 1;

// =============== get all expense =============
router.get("/", async (req, res) => 
{
    res.json(expenses);
});

// ============== add expense =============
router.post("/", async (req, res) => 
{
    const { title, amount } = req.body;

    if (!title || !amount) 
    {
        return res.status(400).json({ message: "Title and amount required" });
    }

    const newExpense = 
    {
        id: currentId++,
        title,
        amount
    };

    expenses.push(newExpense); 

    res.status(201).json(newExpense);
});

// ============== delete expense =============
router.delete("/:id", async (req, res) => 
{
    const expenseId = parseInt(req.params.id);

    expenses = expenses.filter(expense => expense.id !== expenseId);

    res.json({ message: "Expense deleted successfully" });
});

module.exports = router;