import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

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

export default function BookingOverviewPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    adminService.getAllBookings()
      .then(setRows)
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter ? rows.filter((r) => r.status === filter) : rows;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Booking Overview</h1>
          <p className="page-subtitle">{rows.length} total bookings</p>
        </div>
        <select
          className="select-dark"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "auto", padding: "8px 14px" }}
        >
          <option value="">All Statuses</option>
          {["Confirmed", "Cancelled", "Checked-in", "Checked-out", "Check-in Pending"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /><span>Loading bookings...</span></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dark-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No bookings found</td></tr>
                ) : filtered.map((r) => (
                  <tr key={r._id}>
                    <td style={{ fontFamily: "monospace", color: "var(--gold)", fontSize: "0.8rem" }}>{r.invoiceNo}</td>
                    <td style={{ fontWeight: 600 }}>{r.user?.name || "—"}</td>
                    <td>
                      <span style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "6px", padding: "2px 8px", fontSize: "0.82rem", fontWeight: 600 }}>
                        {r.room?.roomNo || "—"}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{new Date(r.checkIn).toLocaleDateString()}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{new Date(r.checkOut).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 700, color: "var(--success)" }}>{r.totalAmount}</td>
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
