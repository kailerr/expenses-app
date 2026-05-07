// ================== handle user expense==================

const express = require("express");
const router = express.Router();

let expenses = []; 

// ===============get all expense============
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

    const newExpense = { title, amount };

    expenses.push(newExpense); 

    res.status(201).json(newExpense);
});

module.exports = router;