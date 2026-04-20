import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Dashboard", icon: "⊞" },
  { to: "/analytics", label: "Analytics", icon: "◈" },
  { to: "/discover", label: "Discover", icon: "◎" },
  { to: "/subscriptions", label: "Subscriptions", icon: "↻" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-name">Expensify</span>
      </div>
      <nav className="sidebar-nav">
        {nav.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "nav-item--active" : ""}`
            }
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `nav-item ${isActive ? "nav-item--active" : ""}`
          }
        >
          <span className="nav-icon">⊙</span>
          <span className="nav-label">Account</span>
        </NavLink>
      </div>
    </aside>
  );
}