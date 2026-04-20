import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Input } from "../components/UI";

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const userData = {
      email: form.email,
    };

    onLogin(userData);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">◈</span>
          <span className="brand-name">Expense Tracker</span>
        </div>

        <h2 className="auth-title">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h2>

        <form onSubmit={handleSubmit} className="expense-form">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="primary">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="auth-switch">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            className="link-btn"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </Card>
    </div>
  );
}