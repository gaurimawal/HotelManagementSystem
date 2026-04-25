import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

function statusBadge(status) {
  const map = {
    "Confirmed":       "badge-confirmed",
    "Cancelled":       "badge-cancelled",
    "Checked-in":      "badge-checkedin",
    "Checked-out":     "badge-available",
    "Check-in Pending":"badge-pending",
  };
  return <span className={`badge ${map[status] || "badge-pending"}`}>{status}</span>;
}

export default function BookingHistoryPage() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    bookingService.getMyBookings()
      .then(setRows)
      .catch((e) => setErr(e.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await bookingService.cancelBooking(id).catch(() => {});
    load();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Bookings</h1>
          <p className="page-subtitle">{rows.length} total bookings</p>
        </div>
      </div>

      {err && <div className="alert-dark error" style={{ marginBottom: "1rem" }}>⚠️ {err}</div>}

      {loading ? (
        <div className="loader-overlay"><div className="spinner-ring" /><span>Loading bookings...</span></div>
      ) : rows.length === 0 ? (
        <div className="section-card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          No bookings yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {rows.map((r) => (
            <div key={r._id} className="section-card fade-in" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: "12px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem", flexShrink: 0
                  }}>🛏️</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>Room {r.room?.roomNo || "—"}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{r.room?.type || "—"}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "2px", fontFamily: "monospace" }}>
                      {r.invoiceNo}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--gold)" }}>${r.totalAmount}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {new Date(r.checkIn).toLocaleDateString()} → {new Date(r.checkOut).toLocaleDateString()}
                    </div>
                  </div>
                  {statusBadge(r.status)}
                  {r.status !== "Cancelled" && r.status !== "Checked-out" && (
                    <button className="btn-danger-sm" onClick={() => cancel(r._id)}>Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
