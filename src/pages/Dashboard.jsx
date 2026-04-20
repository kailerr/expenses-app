import { useState } from "react";
import { Card, Button, Input, Select, Badge } from "../components/UI";

const CATEGORIES = [
  { value: "Food", label: "🍔 Food" },
  { value: "Transport", label: "🚗 Transport" },
  { value: "Shopping", label: "🛍️ Shopping" },
  { value: "Health", label: "💊 Health" },
  { value: "Entertainment", label: "🎬 Entertainment" },
  { value: "Bills", label: "🧾 Bills" },
  { value: "Other", label: "📦 Other" },
];

const CATEGORY_COLORS = {
  Food: "orange", Transport: "blue", Shopping: "purple",
  Health: "green", Entertainment: "pink", Bills: "yellow", Other: "gray",
};

export default function Dashboard({ expenses, onAdd, onDelete }) {
  const [form, setForm] = useState({
    title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0],
  });
  const [showForm, setShowForm] = useState(false);

  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = thisMonth.reduce((a, e) => a + e.amount, 0);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!form.title || !form.amount) return;
    onAdd({ ...form, amount: parseFloat(form.amount), id: Date.now() });
    setForm({ title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0] });
    setShowForm(false);
  };

  const recent = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Track your spending</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Add Expense"}
        </Button>
      </div>

      {showForm && (
        <Card className="form-card">
          <form onSubmit={handleSubmit} className="expense-form">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Coffee, Uber, Netflix..."
              required
            />
            <Input
              label="Amount ($)"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              required
            />
            <Select
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              options={CATEGORIES}
            />
            <Input
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Button type="submit" variant="primary">Add Expense</Button>
          </form>
        </Card>
      )}

      <div className="stats-grid">
        <Card className="stat-card">
          <p className="stat-label">Total Spent</p>
          <p className="stat-value">${total.toFixed(2)}</p>
        </Card>
        <Card className="stat-card">
          <p className="stat-label">This Month</p>
          <p className="stat-value">${monthTotal.toFixed(2)}</p>
        </Card>
        <Card className="stat-card">
          <p className="stat-label">Transactions</p>
          <p className="stat-value">{expenses.length}</p>
        </Card>
      </div>

      <Card>
        <h2 className="section-title">Recent Expenses</h2>
        {recent.length === 0 ? (
          <p className="empty">No expenses yet. Add your first one!</p>
        ) : (
          <div className="expense-list">
            {recent.map((e) => (
              <div key={e.id} className="expense-row">
                <div className="expense-info">
                  <span className="expense-title">{e.title}</span>
                  <Badge color={CATEGORY_COLORS[e.category] || "gray"}>{e.category}</Badge>
                </div>
                <div className="expense-right">
                  <span className="expense-amount">-${e.amount.toFixed(2)}</span>
                  <span className="expense-date">{new Date(e.date).toLocaleDateString()}</span>
                  <button className="delete-btn" onClick={() => onDelete(e.id)} title="Delete">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}