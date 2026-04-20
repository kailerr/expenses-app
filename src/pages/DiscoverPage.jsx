import { Card } from "../components/UI";

const TIPS = [
  { icon: "💡", title: "50/30/20 Rule", desc: "Spend 50% on needs, 30% on wants, and save 20% of your income." },
  { icon: "☕", title: "The Latte Factor", desc: "Small daily purchases add up. Track and cut recurring small expenses to save big." },
  { icon: "📅", title: "Budget Weekly", desc: "Break your monthly budget into weekly limits to stay on track more easily." },
  { icon: "🎯", title: "Set a Goal", desc: "Having a clear savings goal makes you 2x more likely to stick to your budget." },
  { icon: "🔁", title: "Automate Savings", desc: "Set up automatic transfers to savings right when you get paid." },
  { icon: "📊", title: "Review Monthly", desc: "Spend 10 minutes at month's end reviewing your spending to spot trends." },
];

export default function DiscoverPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Discover</h1>
          <p className="page-sub">Tips to improve your finances</p>
        </div>
      </div>
      <div className="tips-grid">
        {TIPS.map((tip) => (
          <Card key={tip.title} className="tip-card">
            <span className="tip-icon">{tip.icon}</span>
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-desc">{tip.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}