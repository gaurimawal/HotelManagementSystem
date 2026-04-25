import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookingService from "../../services/bookingService";
import { useAuth } from "../../context/useAuth";

function statusBadge(status) {
  const map = {
    "Confirmed": "badge-confirmed",
    "Cancelled": "badge-cancelled",
    "Checked-in": "badge-checkedin",
    "Checked-out": "badge-available",
    "Check-in Pending": "badge-pending",
  };
  return <span className={`badge ${map[status] || "badge-pending"}`}>{status}</span>;
}

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getMyBookings().then(setRows).catch(() => setRows([])).finally(() => setLoading(false));
  }, []);

  const confirmed  = rows.filter(x => x.status === "Confirmed").length;
  const cancelled  = rows.filter(x => x.status === "Cancelled").length;
  const checkedIn  = rows.filter(x => x.status === "Checked-in").length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="page-subtitle">Here's your stay overview</p>
        </div>
        <Link to="/customer/rooms">
          <button className="btn-gold">🛏️ Browse Rooms</button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: "1.75rem" }}>
        {[
          { label: "Total Bookings", value: rows.length, icon: "📅", variant: "gold" },
          { label: "Confirmed",      value: confirmed,   icon: "✅", variant: "blue" },
          { label: "Checked-in",     value: checkedIn,   icon: "🏨", variant: "green" },
          { label: "Cancelled",      value: cancelled,   icon: "❌", variant: "red" },
        ].map((c) => (
          <div key={c.label} className={`kpi-card ${c.variant} fade-in`}>
            <div className="kpi-icon" style={{
              background: c.variant === "gold" ? "rgba(212,160,23,0.15)"
                : c.variant === "blue"  ? "rgba(56,189,248,0.15)"
                : c.variant === "green" ? "rgba(34,197,94,0.15)"
                : "rgba(239,68,68,0.15)"
            }}>
              {c.icon}
            </div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-value">{loading ? "—" : c.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="section-card">
        <div className="section-card-header">
          <div className="section-card-title">Recent Bookings</div>
          <Link to="/customer/bookings" style={{ fontSize: "0.82rem", color: "var(--gold)" }}>View All →</Link>
        </div>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /></div>
        ) : rows.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
            No bookings yet. <Link to="/customer/rooms">Book a room →</Link>
          </div>
        ) : (
          <table className="dark-table">
            <thead><tr><th>Room</th><th>Type</th><th>Check-In</th><th>Check-Out</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {rows.slice(0, 5).map((r) => (
                <tr key={r._id}>
                  <td style={{ fontWeight: 700, color: "var(--gold)" }}>{r.room?.roomNo || "—"}</td>
                  <td>{r.room?.type || "—"}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{new Date(r.checkIn).toLocaleDateString()}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{new Date(r.checkOut).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>{r.totalAmount}</td>
                  <td>{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
