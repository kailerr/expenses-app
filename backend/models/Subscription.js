// ============================================================
// store recurr services like Netflix, Spotify
// ============================================================

const mongoose = require("mongoose");

// ================== Schema ==================
const subscriptionSchema = new mongoose.Schema(
  {
    // user own subscription
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name:   
    {
        type: String,
        required: true,
        trim: true,
        maxlength: 80,
    },

    // cost per billing cycle
    amount: 
    {
        type: Number,
        required: true,
        min: 0,
    },

    // billing cycle (weekly / monthly / yearly)
    cycle: 
    {
        type: String,
        enum: ["weekly", "monthly", "yearly"],
        default: "monthly",
    },

    // color for chart or label
    color: 
    {
        type: String,
        default: "#6b7280",
    },

    // billing date use for reminder
    renewalDate: 
    {
        type: Date,
        default: null,
    },

    // if this subscription is active
    isActive: 
    {
        type: Boolean,
        default: true,
    },
  },

  {
        timestamps: true,
  }
);

// ================== Virtual Field ==================
// convert cost to monthly value for compare
subscriptionSchema.virtual("monthlyEquivalent").get(function () 
{
  if (this.cycle === "monthly") 
    return this.amount;
  if (this.cycle === "yearly") 
    return this.amount / 12;
  if (this.cycle === "weekly") 
    return this.amount * 4.33;

  return this.amount;
});

// ================== Index ==================
// help get subscriptions faster by user
subscriptionSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model("Subscription", subscriptionSchema);