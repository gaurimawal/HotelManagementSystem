import { useEffect, useState } from "react";
import staffService from "../../services/staffService";

function priorityBadge(p) {
  if (p === "High")   return <span className="badge badge-occupied">🔴 High</span>;
  if (p === "Normal") return <span className="badge badge-confirmed">🔵 Normal</span>;
  return <span className="badge badge-pending">🟡 {p}</span>;
}

function statusBadge(s) {
  if (s === "Open")        return <span className="badge badge-pending">Open</span>;
  if (s === "In Progress") return <span className="badge badge-confirmed">In Progress</span>;
  if (s === "Resolved")    return <span className="badge badge-checkedin">Resolved</span>;
  return <span className="badge">{s}</span>;
}

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    staffService.getServiceRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const open       = requests.filter(r => r.status === "Open").length;
  const inProgress = requests.filter(r => r.status === "In Progress").length;
  const resolved   = requests.filter(r => r.status === "Resolved").length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Service Requests</h1>
          <p className="page-subtitle">Guest requests requiring attention</p>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
        {[
          { label: "Open",        count: open,       color: "var(--warning)", icon: "📬" },
          { label: "In Progress", count: inProgress,  color: "var(--info)",    icon: "⚙️" },
          { label: "Resolved",    count: resolved,    color: "var(--success)", icon: "✅" },
        ].map((c) => (
          <div key={c.label} className="kpi-card fade-in">
            <div className="kpi-icon" style={{ background: `${c.color}18` }}>{c.icon}</div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-value" style={{ color: c.color }}>{loading ? "—" : c.count}</div>
          </div>
        ))}
      </div>

      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /></div>
        ) : requests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
            No service requests
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dark-table">
              <thead>
                <tr><th>Room</th><th>Request</th><th>Priority</th><th>Assigned To</th><th>Status</th></tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: 700, color: "var(--gold)" }}>{r.room?.roomNo || "—"}</td>
                    <td style={{ maxWidth: "220px" }}>
                      <div style={{ fontWeight: 500 }}>{r.request}</div>
                    </td>
                    <td>{priorityBadge(r.priority)}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {r.assignedStaff?.name || "Unassigned"}
                    </td>
                    <td>{statusBadge(r.status)}</td>
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
