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

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = () => {
    staffService.getBookings()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    await staffService.updateBookingStatus(id, status).catch(() => {});
    load();
  };

  const filtered = filter ? bookings.filter(b => b.status === filter) : bookings;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Booking Management</h1>
          <p className="page-subtitle">{bookings.length} total bookings</p>
        </div>
        <select
          className="select-dark"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "auto", padding: "8px 14px" }}
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dark-table">
              <thead>
                <tr>
                  <th>Invoice</th><th>Guest</th><th>Room</th>
                  <th>Check-In</th><th>Check-Out</th><th>Amount</th>
                  <th>Status</th><th>Update</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No bookings</td></tr>
                ) : filtered.map((b) => (
                  <tr key={b._id}>
                    <td style={{ fontFamily: "monospace", color: "var(--gold)", fontSize: "0.78rem" }}>{b.invoiceNo}</td>
                    <td style={{ fontWeight: 600 }}>{b.user?.name || "—"}</td>
                    <td>
                      <span style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "6px", padding: "2px 8px", fontWeight: 700, fontSize: "0.82rem" }}>
                        {b.room?.roomNo || "—"}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{new Date(b.checkIn).toLocaleDateString()}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{new Date(b.checkOut).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 700, color: "var(--success)" }}>{b.totalAmount}</td>
                    <td>{statusBadge(b.status)}</td>
                    <td>
                      <select
                        className="select-dark"
                        value={b.status}
                        style={{ width: "auto", padding: "4px 10px", fontSize: "0.78rem" }}
                        onChange={(e) => update(b._id, e.target.value)}
                      >
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
