import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import AuthPage from "./pages/AuthPage";
import DiscoverPage from "./pages/DiscoverPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import "./styles/main.css";

const SEED = [
  { id: 1, title: "Grocery Run", amount: 68.4, category: "Food", date: "2026-04-15" },
  { id: 2, title: "Uber to Airport", amount: 34.0, category: "Transport", date: "2026-04-14" },
  { id: 3, title: "Netflix", amount: 15.99, category: "Entertainment", date: "2026-04-01" },
  { id: 4, title: "Gym Membership", amount: 45.0, category: "Health", date: "2026-04-01" },
  { id: 5, title: "New Shoes", amount: 89.99, category: "Shopping", date: "2026-04-10" },
  { id: 6, title: "Electric Bill", amount: 112.0, category: "Bills", date: "2026-03-28" },
];

export default function App() {
  const [expenses, setExpenses] = useState(SEED);
  const [user, setUser] = useState(null);

  const addExpense = (expense) => setExpenses((prev) => [expense, ...prev]);
  const deleteExpense = (id) =>
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <AuthPage onLogin={setUser} />
            )
          }
        />

        <Route
          path="/"
          element={
            user ? (
              <div className="layout">
                <Sidebar />
                <main className="main-content">
                  <Dashboard
                    expenses={expenses}
                    onAdd={addExpense}
                    onDelete={deleteExpense}
                  />
                </main>
              </div>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="/analytics"
          element={
            user ? (
              <div className="layout">
                <Sidebar />
                <main className="main-content">
                  <AnalyticsPage expenses={expenses} />
                </main>
              </div>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="/discover"
          element={
            user ? (
              <div className="layout">
                <Sidebar />
                <main className="main-content">
                  <DiscoverPage />
                </main>
              </div>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="/subscriptions"
          element={
            user ? (
              <div className="layout">
                <Sidebar />
                <main className="main-content">
                  <SubscriptionsPage />
                </main>
              </div>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/auth"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}