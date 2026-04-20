export function SpendingChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
  const colors = {
    Food: "#f97316",
    Transport: "#3b82f6",
    Shopping: "#a855f7",
    Health: "#22c55e",
    Entertainment: "#ec4899",
    Bills: "#eab308",
    Other: "#6b7280",
  };

  const entries = Object.entries(categoryTotals);
  if (entries.length === 0) {
    return (
      <div className="chart-empty">
        <p>No spending data yet</p>
      </div>
    );
  }

  let cumulativePercent = 0;
  const slices = entries.map(([cat, amount]) => {
    const pct = (amount / total) * 100;
    const start = cumulativePercent;
    cumulativePercent += pct;
    return { cat, amount, pct, start, color: colors[cat] || "#6b7280" };
  });

  const getCoords = (pct) => {
    const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2;
    return {
      x: 50 + 40 * Math.cos(angle),
      y: 50 + 40 * Math.sin(angle),
    };
  };

  return (
    <div className="chart-container">
      <svg viewBox="0 0 100 100" className="donut-chart">
        {slices.map(({ cat, pct, start, color }) => {
          const s = getCoords(start);
          const e = getCoords(start + pct);
          const large = pct > 50 ? 1 : 0;
          return (
            <path
              key={cat}
              d={`M50 50 L${s.x} ${s.y} A40 40 0 ${large} 1 ${e.x} ${e.y} Z`}
              fill={color}
              opacity="0.9"
            />
          );
        })}
        <circle cx="50" cy="50" r="24" fill="var(--bg-card)" />
      </svg>
      <div className="chart-legend">
        {slices.map(({ cat, amount, pct, color }) => (
          <div key={cat} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            <span className="legend-label">{cat}</span>
            <span className="legend-amount">${amount.toFixed(2)}</span>
            <span className="legend-pct">{pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MonthlyBar({ expenses }) {
  const byMonth = expenses.reduce((acc, e) => {
    const m = new Date(e.date).toLocaleString("default", { month: "short" });
    acc[m] = (acc[m] || 0) + e.amount;
    return acc;
  }, {});

  const entries = Object.entries(byMonth).slice(-6);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  if (entries.length === 0) return null;

  return (
    <div className="bar-chart">
      {entries.map(([month, amt]) => (
        <div key={month} className="bar-col">
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ height: `${(amt / max) * 100}%` }}
              title={`$${amt.toFixed(2)}`}
            />
          </div>
          <span className="bar-label">{month}</span>
        </div>
      ))}
    </div>
  );
}