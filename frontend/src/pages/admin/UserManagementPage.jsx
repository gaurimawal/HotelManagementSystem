import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

function roleBadge(role) {
  const cls = role === "admin" ? "role-badge-admin" : role === "staff" ? "role-badge-staff" : "role-badge-customer";
  return <span className={`badge ${cls}`} style={{ textTransform: "capitalize" }}>{role}</span>;
}

function Avatar({ name }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";
  return (
    <div className="avatar" style={{ width: 32, height: 32, fontSize: "0.75rem" }}>{initials}</div>
  );
}

export default function UserManagementPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminService.getUsers().then(setRows).catch(() => setRows([])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateRole = async (id, role) => {
    await adminService.updateUserRole(id, role);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">{rows.length} registered users</p>
        </div>
      </div>

      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /><span>Loading users...</span></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dark-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Change Role</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r._id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Avatar name={r.name} />
                        <span style={{ fontWeight: 600 }}>{r.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{r.email}</td>
                    <td style={{ color: "var(--text-muted)" }}>{r.phone || "—"}</td>
                    <td>{roleBadge(r.role)}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <select
                        className="select-dark"
                        value={r.role}
                        onChange={(e) => updateRole(r._id, e.target.value)}
                        style={{ width: "auto", padding: "5px 10px", fontSize: "0.82rem" }}
                      >
                        <option value="customer">Customer</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
