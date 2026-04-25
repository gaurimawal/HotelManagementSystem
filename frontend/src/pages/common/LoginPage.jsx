import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(values);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👋</div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text)", marginBottom: "6px", fontFamily: "'Playfair Display', serif" }}>
          Welcome back
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Sign in to your HMS account
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="alert-dark error fade-in" style={{ marginBottom: "1.25rem" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={submit}>
        <div style={{ marginBottom: "1rem" }}>
          <label className="form-label-dark">Email Address</label>
          <input
            className="input-dark"
            type="email"
            placeholder="you@example.com"
            required
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label className="form-label-dark">Password</label>
          <input
            className="input-dark"
            type="password"
            placeholder="••••••••"
            required
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>

        <button className="btn-gold w-100" type="submit" disabled={loading}
          style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
          {loading ? (
            <>
              <span className="spinner-ring" style={{ width: 16, height: 16, borderWidth: 2 }} />
              Signing in...
            </>
          ) : "Sign In →"}
        </button>
      </form>

      {/* Links */}
      <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
        <Link to="/register" style={{ color: "var(--gold)" }}>Create account</Link>
        <Link to="/forgot-password" style={{ color: "var(--text-muted)" }}>Forgot password?</Link>
      </div>

      {/* Demo Hint */}
      <div style={{
        marginTop: "2rem",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "14px",
        fontSize: "0.78rem",
        color: "var(--text-muted)",
        lineHeight: 1.8
      }}>
        <div style={{ fontWeight: 700, color: "var(--gold)", marginBottom: "4px" }}>🔑 Quick Demo Login</div>
        <div>admin@hms.com · staff@hms.com · customer@hms.com</div>
        <div>Password: <span style={{ color: "var(--gold-2)" }}>123456</span></div>
      </div>
    </div>
  );
}
