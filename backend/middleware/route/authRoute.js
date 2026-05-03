// ============ handle user register and login=============

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// generate JWT token
const generateToken = (id) => 
{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================== register ==================
// create new user
router.post("/register", async (req, res) => 
{
    const { email, password } = req.body;

    try 
    {
        if (!email || !password) 
        {
            return res.status(400).json({ message: "Email and password required" });
        }

        const existing = await User.findOne({ email });
        if (existing) 
        {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ email, password });

        res.status(201).json(
        {
            id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });

    } 
    catch (err) 
    {
        res.status(500).json({ message: "Server error" });
    }
});

// ================== login ==================
// verify user for login
router.post("/login", async (req, res) => 
{
    const { email, password } = req.body;

    try 
    {
        if (!email || !password) 
        {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) 
        {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json(
        {
            id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });

    } 
    catch (err) 
    {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;