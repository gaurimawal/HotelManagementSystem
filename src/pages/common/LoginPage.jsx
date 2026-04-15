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
    <>
      <h3>Login</h3>
      <p className="text-muted small">Demo: admin@hms.com / 123456, staff@hms.com / 123456, customer@hms.com / 123456</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Email" type="email" required value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
        <input className="form-control mb-3" placeholder="Password" type="password" required value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
      </form>
      <div className="small mt-3 d-flex justify-content-between"><Link to="/register">Register</Link><Link to="/forgot-password">Forgot password</Link></div>
    </>
  );
}
