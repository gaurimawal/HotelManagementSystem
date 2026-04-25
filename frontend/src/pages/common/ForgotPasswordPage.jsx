import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    try {
      const res = await authService.forgotPassword(email);
      setMsg(res.message);
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    }
  };

  return <><h3>Forgot Password</h3>{msg ? <div className="alert alert-success">{msg}</div> : null}{err ? <div className="alert alert-danger">{err}</div> : null}<form onSubmit={submit}><input className="form-control mb-2" placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /><button className="btn btn-primary w-100">Send reset link</button></form><Link className="small d-block mt-2" to="/login">Back to login</Link></>;
}
