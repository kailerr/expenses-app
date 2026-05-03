// ================== handle user expense==================

const express = require("express");
const Expense = require("../models/Expense");
const protect = require("../middleware/auth");

const router = express.Router();

// all route require login
router.use(protect);

// ===============get all expense of current user============
router.get("/", async (req, res) => 
{
    try 
    {
        const expenses = await Expense.find({ user: req.user.id })
            .sort({ date: -1 }); // newest first

        res.json(expenses);

    } 
    catch (err) 
    {
        res.status(500).json({ message: "Server error" });
    }
});

// ============== add expense =============
// create new expense
router.post("/", async (req, res) => 
{
    const { title, amount, category, date } = req.body;

    try 
    {
        if (!title || !amount) 
        {
            return res.status(400).json({ message: "Title and amount required" });
        }

        const expense = await Expense.create(
        {
            user: req.user.id,
            title,
            amount,
            category: category || "Other",
            date: date || Date.now(),
        });

        res.status(201).json(expense);

    } 
    catch (err) 
    {
        res.status(500).json({ message: "Server error" });
    }
});

// ============== delete expense =============
// delete by ID
router.delete("/:id", async (req, res) => 
{
    try 
    {
        const expense = await Expense.findById(req.params.id);

        if (!expense) 
        {
            return res.status(404).json({ message: "Expense not found" });
        }

        // check ownership
        if (expense.user.toString() !== req.user.id.toString()) 
        {
            return res.status(403).json({ message: "Not authorized" });
        }

        await expense.deleteOne();

        res.json({ message: "Deleted", id: req.params.id });

    } 
    catch (err) 
    {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;