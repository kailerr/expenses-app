
// =================andle user subscriptions =============

const express = require("express");
const Subscription = require("../models/Subscription");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// ================== get subscription ==================
router.get("/", async (req, res) => 
{
    try 
    {
        const subs = await Subscription.find(
        {
            user: req.user.id,
            isActive: true,
        }).sort({ createdAt: -1 });

        res.json(subs);

    } 
    catch (err)     
    {
        res.status(500).json({ message: "Server error" });
    }
});

// ================== add subscription ==================
// create new subscription
router.post("/", async (req, res) => 
{
    const { name, amount, cycle, color, renewalDate } = req.body;

    try 
    {
        if (!name || !amount) 
        {
            return res.status(400).json({ message: "Name and amount required" });
        }

        const sub = await Subscription.create(
        {
            user: req.user.id,
            name,
            amount,
            cycle: cycle || "monthly",
            color: color || "#6b7280",
            renewalDate: renewalDate || null,
        });

        res.status(201).json(sub);

    } 
    catch (err) 
    {
        res.status(500).json({ message: "Server error" });
    }
});

// ================== update subscription by ID ==================
router.put("/:id", async (req, res) => 
{
    try     
    {
        const sub = await Subscription.findById(req.params.id);

        if (!sub) 
        {
            return res.status(404).json({ message: "Not found" });
        }

        if (sub.user.toString() !== req.user.id.toString()) 
        {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { name, amount, cycle, color, renewalDate, isActive } = req.body;

        if (name !== undefined) sub.name = name;
        if (amount !== undefined) sub.amount = amount;
        if (cycle !== undefined) sub.cycle = cycle;
        if (color !== undefined) sub.color = color;
        if (renewalDate !== undefined) sub.renewalDate = renewalDate;
        if (isActive !== undefined) sub.isActive = isActive;

        const updated = await sub.save();

        res.json(updated);

    } 
    catch (err) 
    {
        res.status(500).json({ message: "Server error" });
    }
});

// ================== delete subscription by ID ==================
router.delete("/:id", async (req, res) => 
{
    try 
    {
        const sub = await Subscription.findById(req.params.id);

        if (!sub) 
        {
            return res.status(404).json({ message: "Not found" });
        }

        if (sub.user.toString() !== req.user.id.toString())
        {
            return res.status(403).json({ message: "Not authorized" });
        }

        await sub.deleteOne();

        res.json({ message: "Deleted", id: req.params.id });

    } 
    catch (err)     
    {
        res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;