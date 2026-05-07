// ============================================================
// store every expense record for each user
// each expense is linked to a specific user
// ============================================================

const mongoose = require("mongoose");

// ================== Schema ==================
const expenseSchema = new mongoose.Schema(
  {
    // link to the user who owns this expense
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",        
        required: true,
    },

    title: 
    {
        type: String,
        required: true,     
        trim: true,         
        maxlength: 100,     
    },

    amount: 
    {
        type: Number,
        required: true,
        min: 0,
        set: (v) => Math.round(v * 100) / 100, // ex 15.999 -> 16.00
    },

    category: 
    {
        type: String,
        enum: ["Food", "Transport", "Shopping", "Health", "Entertainment", "Bills", "Other"],
        default: "Other",   
    },

    date: 
    {
        type: Date,
        default: Date.now,
        validate: 
        {
            validator: (v) => v <= new Date(),
            message: "Date cannot be in the future",
        },
    },
  },

  {
        timestamps: true,     // adds createdAt and updatedAt
  }
);

// ================== Index ==================
// help get user expenses faster, sorted by date
expenseSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Expense", expenseSchema);