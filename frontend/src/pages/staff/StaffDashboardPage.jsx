import { useEffect, useState } from "react";
import staffService from "../../services/staffService";

function statusBadge(status) {
  const map = {
    "Confirmed": "badge-confirmed", "Cancelled": "badge-cancelled",
    "Checked-in": "badge-checkedin", "Checked-out": "badge-available",
    "Check-in Pending": "badge-pending",
  };
  return <span className={`badge ${map[status] || "badge-pending"}`}>{status}</span>;
}

const STATUSES = ["Check-in Pending", "Confirmed", "Checked-in", "Checked-out", "Cancelled"];

export default function StaffDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    staffService.getBookings().then(setBookings).catch(() => setBookings([])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const today = bookings.filter(b => {
    const ci = new Date(b.checkIn).toDateString();
    return ci === new Date().toDateString();
  }).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Staff Dashboard</h1>
          <p className="page-subtitle">Manage check-ins, check-outs, and room status</p>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: "1.75rem" }}>
        {[
          { label: "Total Bookings",  value: bookings.length, icon: "📅", v: "gold" },
          { label: "Today's Check-ins", value: today, icon: "🏨", v: "blue" },
          { label: "Checked-in",      value: bookings.filter(b => b.status === "Checked-in").length, icon: "✅", v: "green" },
          { label: "Pending",         value: bookings.filter(b => b.status === "Check-in Pending").length, icon: "⏳", v: "red" },
        ].map((c) => (
          <div key={c.label} className={`kpi-card ${c.v} fade-in`}>
            <div className="kpi-icon" style={{ background: c.v === "gold" ? "rgba(212,160,23,0.15)" : c.v === "blue" ? "rgba(56,189,248,0.15)" : c.v === "green" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)" }}>
              {c.icon}
            </div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-value">{loading ? "—" : c.value}</div>
          </div>
        ))}
      </div>

      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="section-card-header" style={{ padding: "1rem 1.5rem", margin: 0 }}>
          <div className="section-card-title">All Bookings</div>
        </div>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dark-table">
              <thead><tr><th>Guest</th><th>Room</th><th>Check-In</th><th>Check-Out</th><th>Status</th><th>Update</th></tr></thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td style={{ fontWeight: 600 }}>{b.user?.name || "—"}</td>
                    <td style={{ color: "var(--gold)", fontWeight: 700 }}>{b.room?.roomNo || "—"}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{new Date(b.checkIn).toLocaleDateString()}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{new Date(b.checkOut).toLocaleDateString()}</td>
                    <td>{statusBadge(b.status)}</td>
                    <td>
                      <select className="select-dark" value={b.status} style={{ width: "auto", padding: "4px 10px", fontSize: "0.8rem" }}
                        onChange={async (e) => {
                          await staffService.updateBookingStatus(b._id, e.target.value);
                          load();
                        }}>
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
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
