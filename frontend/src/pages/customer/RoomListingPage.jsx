import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import roomService from "../../services/roomService";

function statusBadge(status) {
  const cls = status === "Available" ? "badge-available"
    : status === "Occupied" ? "badge-occupied" : "badge-maintenance";
  const icon = status === "Available" ? "●" : status === "Occupied" ? "●" : "●";
  return <span className={`badge ${cls}`}>{icon} {status}</span>;
}

export default function RoomListingPage() {
  const [rooms, setRooms] = useState([]);
  const [f, setF] = useState({ type: "", max: "", status: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roomService.getRooms()
      .then(setRooms)
      .catch((e) => setErr(e.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    rooms.filter((r) =>
      (!f.type   || r.type === f.type) &&
      (!f.status || r.status === f.status) &&
      (!f.max    || r.price <= Number(f.max))
    ),
    [rooms, f]
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Browse Rooms</h1>
          <p className="page-subtitle">{filtered.length} rooms available</p>
        </div>
      </div>

      {err && <div className="alert-dark error" style={{ marginBottom: "1rem" }}>⚠️ {err}</div>}

      {/* Filters */}
      <div className="section-card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", alignItems: "end" }}>
          <div>
            <label className="form-label-dark">Room Type</label>
            <select className="select-dark" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
              <option value="">All Types</option>
              <option>Standard</option><option>Deluxe</option><option>Suite</option>
            </select>
          </div>
          <div>
            <label className="form-label-dark">Max Price / Night</label>
            <input className="input-dark" type="number" placeholder="e.g. 300" value={f.max} onChange={(e) => setF({ ...f, max: e.target.value })} />
          </div>
          <div>
            <label className="form-label-dark">Status</label>
            <select className="select-dark" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}>
              <option value="">Any Status</option>
              <option>Available</option><option>Occupied</option><option>Maintenance</option>
            </select>
          </div>
          <div>
            <button className="btn-ghost w-100" onClick={() => setF({ type: "", max: "", status: "" })}>Clear Filters</button>
          </div>
        </div>
      </div>

      {/* Room Grid */}
      {loading ? (
        <div className="loader-overlay"><div className="spinner-ring" /><span>Loading rooms...</span></div>
      ) : filtered.length === 0 ? (
        <div className="section-card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          No rooms match your filters
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map((r) => (
            <div key={r._id} className="room-card fade-in">
              {r.images?.[0] ? (
                <img src={r.images[0]} alt={r.roomNo} className="room-card-img" />
              ) : (
                <div className="room-card-img-placeholder">🛏️</div>
              )}
              <div className="room-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>{r.roomNo}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{r.type}</div>
                  </div>
                  {statusBadge(r.status)}
                </div>

                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--gold)", marginBottom: "10px" }}>
                  {r.price}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--text-muted)" }}>/night</span>
                </div>

                {r.amenities?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                    {r.amenities.slice(0, 4).map((a) => <span key={a} className="amenity-chip">{a}</span>)}
                  </div>
                )}

                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to={`/customer/rooms/{r._id}`} style={{ flex: 1 }}>
                    <button className="btn-ghost w-100">Details</button>
                  </Link>
                  {r.status === "Available" && (
                    <Link to={`/customer/book/{r._id}`} style={{ flex: 1 }}>
                      <button className="btn-gold w-100" style={{ justifyContent: "center" }}>Book →</button>
                    </Link>
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
