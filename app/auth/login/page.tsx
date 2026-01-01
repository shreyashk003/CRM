"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Invalid login");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-brand">
        <h1>CRM Suite</h1>
        <p>
          Manage customers, track leads, and grow your business with a
          centralized CRM platform designed for efficiency.
        </p>
      </div>

      <div className="auth-panel">
        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <span>Login to your CRM account</span>

          {error && <div className="auth-error">{error}</div>}

          <input
            type="email"
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="auth-footer">
            No account? <a href="/auth/register">Create one</a>
          </div>
        </form>
      </div>
    </div>
  );
}
