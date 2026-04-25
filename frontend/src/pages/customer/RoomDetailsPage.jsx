import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import roomService from "../../services/roomService";

function statusBadge(status) {
  const cls = status === "Available" ? "badge-available"
    : status === "Occupied" ? "badge-occupied" : "badge-maintenance";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export default function RoomDetailsPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    roomService.getRoomById(roomId).then(setRoom).catch((e) => setErr(e.response?.data?.message || e.message));
  }, [roomId]);

  if (err) return <div className="alert-dark error" style={{ margin: "2rem" }}>⚠️ {err}</div>;
  if (!room) return <div className="loader-overlay"><div className="spinner-ring" /><span>Loading room...</span></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Room {room.roomNo}</h1>
          <p className="page-subtitle">{room.type} Room</p>
        </div>
        {room.status === "Available" && (
          <Link to={`/customer/book/${room._id}`}>
            <button className="btn-gold">Book Now →</button>
          </Link>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>
        {/* Main */}
        <div>
          {room.images?.[0] ? (
            <img src={room.images[0]} alt={room.roomNo}
              style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "var(--radius)", marginBottom: "1.25rem" }} />
          ) : (
            <div style={{
              width: "100%", height: "280px", borderRadius: "var(--radius)", marginBottom: "1.25rem",
              background: "linear-gradient(135deg, var(--surface-2), var(--surface-3))",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem"
            }}>🛏️</div>
          )}

          <div className="section-card">
            <div className="section-card-title" style={{ marginBottom: "1rem" }}>Amenities</div>
            {room.amenities?.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {room.amenities.map((a) => (
                  <span key={a} style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "7px 14px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    display: "flex", alignItems: "center", gap: "6px"
                  }}>✓ {a}</span>
                ))}
              </div>
            ) : (
              <div style={{ color: "var(--text-muted)" }}>No amenities listed</div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="section-card glass-card-gold">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <div className="kpi-label">Room Number</div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{room.roomNo}</div>
            </div>
            <div className="divider" />
            <div>
              <div className="kpi-label">Type</div>
              <div style={{ fontWeight: 600 }}>{room.type}</div>
            </div>
            <div className="divider" />
            <div>
              <div className="kpi-label">Status</div>
              {statusBadge(room.status)}
            </div>
            <div className="divider" />
            <div>
              <div className="kpi-label">Rate</div>
              <div style={{ fontWeight: 800, fontSize: "1.8rem", color: "var(--gold)" }}>
                {room.price}
                <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "var(--text-muted)" }}>/night</span>
              </div>
            </div>
            {room.status === "Available" && (
              <>
                <div className="divider" />
                <Link to={`/customer/book/${room._id}`}>
                  <button className="btn-gold w-100" style={{ justifyContent: "center", padding: "12px" }}>
                    Book This Room →
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
