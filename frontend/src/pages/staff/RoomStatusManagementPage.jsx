import { useEffect, useState } from "react";
import staffService from "../../services/staffService";

function statusBadge(status) {
  const cls = status === "Available" ? "badge-available"
    : status === "Occupied" ? "badge-occupied" : "badge-maintenance";
  return <span className={`badge ${cls}`}>{status}</span>;
}

const STATUSES = ["Available", "Occupied", "Maintenance"];

export default function RoomStatusManagementPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    staffService.getRooms
      ? staffService.getRooms().then(setRooms).catch(() => setRooms([])).finally(() => setLoading(false))
      : import("../../services/roomService").then(m => m.default.getRooms()).then(setRooms).catch(() => setRooms([])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await staffService.updateRoomStatus(id, status).catch(() => {});
    load();
  };

  const counts = {
    Available: rooms.filter(r => r.status === "Available").length,
    Occupied: rooms.filter(r => r.status === "Occupied").length,
    Maintenance: rooms.filter(r => r.status === "Maintenance").length,
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Room Status</h1>
          <p className="page-subtitle">Monitor and update room availability</p>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
        {[
          { label: "Available",   count: counts.Available,   color: "var(--success)", icon: "✅" },
          { label: "Occupied",    count: counts.Occupied,    color: "var(--danger)",  icon: "🔴" },
          { label: "Maintenance", count: counts.Maintenance, color: "var(--warning)", icon: "🔧" },
        ].map((c) => (
          <div key={c.label} className="kpi-card fade-in" style={{ borderColor: `${c.color}22` }}>
            <div className="kpi-icon" style={{ background: `${c.color}18`, fontSize: "1.2rem" }}>{c.icon}</div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-value" style={{ color: c.color }}>{loading ? "—" : c.count}</div>
            <div className="kpi-sub">rooms</div>
          </div>
        ))}
      </div>

      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /><span>Loading rooms...</span></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dark-table">
              <thead>
                <tr><th>Room</th><th>Type</th><th>Price</th><th>Current Status</th><th>Update Status</th></tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: 700, color: "var(--gold)" }}>{r.roomNo}</td>
                    <td>{r.type}</td>
                    <td style={{ fontWeight: 600 }}>{r.price}/night</td>
                    <td>{statusBadge(r.status)}</td>
                    <td>
                      <select
                        className="select-dark"
                        value={r.status}
                        style={{ width: "auto", padding: "5px 10px", fontSize: "0.82rem" }}
                        onChange={(e) => updateStatus(r._id, e.target.value)}
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
