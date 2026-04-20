import { useState } from "react";
import { Card, Button, Input, Select } from "../components/UI";

const CYCLES = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "weekly", label: "Weekly" },
];

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState([
    { id: 1, name: "Netflix", amount: 15.99, cycle: "monthly", color: "#e50914" },
    { id: 2, name: "Spotify", amount: 9.99, cycle: "monthly", color: "#1db954" },
    { id: 3, name: "iCloud", amount: 2.99, cycle: "monthly", color: "#0071e3" },
  ]);
  const [form, setForm] = useState({ name: "", amount: "", cycle: "monthly" });
  const [showForm, setShowForm] = useState(false);

  const monthlyTotal = subs.reduce((a, s) => {
    if (s.cycle === "monthly") return a + s.amount;
    if (s.cycle === "yearly") return a + s.amount / 12;
    if (s.cycle === "weekly") return a + s.amount * 4.33;
    return a;
  }, 0);

  const handleAdd = (ev) => {
    ev.preventDefault();
    if (!form.name || !form.amount) return;
    setSubs([...subs, { ...form, amount: parseFloat(form.amount), id: Date.now(), color: "#6b7280" }]);
    setForm({ name: "", amount: "", cycle: "monthly" });
    setShowForm(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subscriptions</h1>
          <p className="page-sub">Recurring payments at a glance</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Add Sub"}
        </Button>
      </div>

      {showForm && (
        <Card className="form-card">
          <form onSubmit={handleAdd} className="expense-form">
            <Input label="Service" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Netflix, Spotify..." required />
            <Input label="Amount ($)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="9.99" required />
            <Select label="Billing Cycle" value={form.cycle} onChange={(e) => setForm({ ...form, cycle: e.target.value })} options={CYCLES} />
            <Button type="submit">Add Subscription</Button>
          </form>
        </Card>
      )}

      <Card className="stat-card" style={{ marginBottom: "1.5rem" }}>
        <p className="stat-label">Monthly Cost</p>
        <p className="stat-value">${monthlyTotal.toFixed(2)}<span style={{ fontSize: "1rem", opacity: 0.5 }}>/mo</span></p>
      </Card>

      <div className="sub-grid">
        {subs.map((s) => (
          <Card key={s.id} className="sub-card">
            <div className="sub-dot" style={{ background: s.color }} />
            <div className="sub-info">
              <p className="sub-name">{s.name}</p>
              <p className="sub-cycle">{s.cycle}</p>
            </div>
            <div className="sub-amount">
              <span>${s.amount.toFixed(2)}</span>
              <button className="delete-btn" onClick={() => setSubs(subs.filter((x) => x.id !== s.id))}>✕</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}