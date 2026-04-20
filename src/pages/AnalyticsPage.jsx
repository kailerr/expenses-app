import { Card } from "../components/UI";
import { SpendingChart, MonthlyBar } from "../components/Charts";

export default function AnalyticsPage({ expenses }) {
  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const avg = expenses.length ? total / expenses.length : 0;

  const topCat = Object.entries(
    expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-sub">Understand your spending patterns</p>
        </div>
      </div>

      <div className="stats-grid">
        <Card className="stat-card">
          <p className="stat-label">Avg per Transaction</p>
          <p className="stat-value">${avg.toFixed(2)}</p>
        </Card>
        <Card className="stat-card">
          <p className="stat-label">Top Category</p>
          <p className="stat-value">{topCat ? topCat[0] : "—"}</p>
        </Card>
        <Card className="stat-card">
          <p className="stat-label">Total Transactions</p>
          <p className="stat-value">{expenses.length}</p>
        </Card>
      </div>

      <div className="charts-grid">
        <Card>
          <h2 className="section-title">Spending by Category</h2>
          <SpendingChart expenses={expenses} />
        </Card>
        <Card>
          <h2 className="section-title">Monthly Overview</h2>
          <MonthlyBar expenses={expenses} />
        </Card>
      </div>
    </div>
  );
}