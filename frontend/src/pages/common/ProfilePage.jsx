import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useAuth } from "../../context/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userService.getProfile()
      .then((u) => setForm({ name: u.name || "", email: u.email || "", phone: u.phone || "" }))
      .catch((e) => setErr(e.response?.data?.message || e.message));
  }, []);

  const save = async () => {
    setMsg(""); setErr(""); setLoading(true);
    try {
      await userService.updateProfile({ name: form.name, phone: form.phone });
      setMsg("Profile updated successfully!");
    } catch (e) {
      setErr(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const initials = form.name
    ? form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Update your personal information</p>
        </div>
      </div>

      <div style={{ maxWidth: "600px" }}>
        {/* Avatar */}
        <div className="section-card" style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--gold), #b8860b)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem", fontWeight: 800, color: "#0a0e1a",
              border: "3px solid var(--border-2)",
              boxShadow: "var(--shadow-gold)"
            }}>{initials}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{form.name || "Loading..."}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{form.email}</div>
              <span className={`badge role-badge-${user?.role || "customer"}`} style={{ marginTop: "4px", textTransform: "capitalize" }}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="section-card">
          <div className="section-card-header">
            <div className="section-card-title">Edit Details</div>
          </div>

          {msg && <div className="alert-dark success" style={{ marginBottom: "1rem" }}>✅ {msg}</div>}
          {err && <div className="alert-dark error"   style={{ marginBottom: "1rem" }}>⚠️ {err}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="form-label-dark">Full Name</label>
              <input
                className="input-dark"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="form-label-dark">Email Address</label>
              <input
                className="input-dark"
                value={form.email}
                readOnly
                style={{ opacity: 0.6, cursor: "not-allowed" }}
              />
            </div>
            <div>
              <label className="form-label-dark">Phone Number</label>
              <input
                className="input-dark"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 555-0000"
              />
            </div>

            <button className="btn-gold" onClick={save} disabled={loading}
              style={{ width: "fit-content", marginTop: "0.5rem" }}>
              {loading ? (
                <><span className="spinner-ring" style={{ width: 16, height: 16, borderWidth: 2 }} /> Saving...</>
              ) : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
