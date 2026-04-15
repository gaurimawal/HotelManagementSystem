import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({ name: "", email: "", password: "", role: "customer" });
  return <><h3>Register</h3>{message ? <div className="alert alert-success">{message}</div> : null}<form onSubmit={async (e) => { e.preventDefault(); const r = await register(values); setMessage(r.message); }}><input className="form-control mb-2" placeholder="Name" required value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} /><input className="form-control mb-2" placeholder="Email" type="email" required value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} /><input className="form-control mb-2" placeholder="Password" type="password" minLength={6} required value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} /><select className="form-select mb-3" value={values.role} onChange={(e) => setValues({ ...values, role: e.target.value })}><option value="customer">Customer</option><option value="staff">Staff</option></select><button className="btn btn-primary w-100">Create Account</button></form><Link className="small d-block mt-2" to="/login">Back to login</Link></>;
}
