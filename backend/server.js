const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// import route
const expenseRoutes = require("./routes/expenseRoute");

// mount route
app.use("/api/expenses", expenseRoutes);

// test root
app.get("/", (req, res) => 
{
    res.json({ message: "API is running" });
});

app.get("/test", (req, res) => 
{
    res.json({ ok: true });
});

const PORT = 3001;

app.listen(PORT, () => 
{
    console.log(`Server running on port ${PORT}`);
});