import { useEffect, useState } from "react";
import userService from "../../services/userService";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    userService.getProfile().then((u) => setForm({ name: u.name || "", email: u.email || "", phone: u.phone || "" })).catch((e) => setErr(e.response?.data?.message || e.message));
  }, []);

  const save = async () => {
    setMsg("");
    setErr("");
    try {
      await userService.updateProfile({ name: form.name, phone: form.phone });
      setMsg("Profile updated");
    } catch (e) {
      setErr(e.response?.data?.message || e.message);
    }
  };

  return <div className="card border-0 shadow-sm"><div className="card-body"><h4>Profile</h4>{msg ? <div className="alert alert-success">{msg}</div> : null}{err ? <div className="alert alert-danger">{err}</div> : null}<input className="form-control mb-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="form-control mb-2" value={form.email} readOnly /><input className="form-control mb-3" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><button className="btn btn-primary" onClick={save}>Save</button></div></div>;
}
