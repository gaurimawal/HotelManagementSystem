import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.register(values);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div style={{ marginBottom: "1rem" }}>
      <label className="form-label-dark">{label}</label>
      <input
        className="input-dark"
        type={type}
        placeholder={placeholder}
        value={values[key]}
        onChange={(e) => setValues({ ...values, [key]: e.target.value })}
        required={key !== "phone"}
      />
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✨</div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text)", marginBottom: "6px", fontFamily: "'Playfair Display', serif" }}>
          Create Account
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Join the HMS platform as a guest
        </p>
      </div>

      {error && (
        <div className="alert-dark error fade-in" style={{ marginBottom: "1.25rem" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={submit}>
        {field("name", "Full Name", "text", "John Doe")}
        {field("email", "Email Address", "email", "you@example.com")}
        {field("phone", "Phone (optional)", "tel", "+1 555-0000")}
        {field("password", "Password", "password", "Min. 6 characters")}

        <button className="btn-gold" type="submit" disabled={loading}
          style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: "0.5rem" }}>
          {loading ? (
            <>
              <span className="spinner-ring" style={{ width: 16, height: 16, borderWidth: 2 }} />
              Creating account...
            </>
          ) : "Create Account →"}
        </button>
      </form>

      <div style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Already have an account? <Link to="/login" style={{ color: "var(--gold)" }}>Sign in</Link>
      </div>
    </div>
  );
}
