import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUI } from "../../context/useUI";
import bookingService from "../../services/bookingService";
import roomService from "../../services/roomService";

export default function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useUI();
  const [room, setRoom] = useState(null);
  const [v, setV] = useState({ checkIn: "", checkOut: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    roomService.getRoomById(roomId).then(setRoom).catch(() => {});
  }, [roomId]);

  const nights = v.checkIn && v.checkOut
    ? Math.max(0, Math.round((new Date(v.checkOut) - new Date(v.checkIn)) / 86400000))
    : 0;

  const total = room ? nights * room.price : 0;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (nights <= 0) { setError("Check-out must be after check-in"); return; }
    setLoading(true);
    try {
      await bookingService.createBooking({ roomId, checkIn: v.checkIn, checkOut: v.checkOut });
      showAlert("Booking confirmed! 🎉", "success");
      navigate("/customer/bookings");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Book Room {room?.roomNo}</h1>
          <p className="page-subtitle">{room?.type} · ${room?.price}/night</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>
        {/* Form */}
        <div className="section-card">
          <div className="section-card-header">
            <div className="section-card-title">Select Dates</div>
          </div>

          {error && <div className="alert-dark error" style={{ marginBottom: "1rem" }}>⚠️ {error}</div>}

          <form onSubmit={submit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label className="form-label-dark">Check-In Date</label>
                <input
                  className="input-dark"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={v.checkIn}
                  onChange={(e) => setV({ ...v, checkIn: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label-dark">Check-Out Date</label>
                <input
                  className="input-dark"
                  type="date"
                  required
                  min={v.checkIn || new Date().toISOString().split("T")[0]}
                  value={v.checkOut}
                  onChange={(e) => setV({ ...v, checkOut: e.target.value })}
                />
              </div>
            </div>

            <button className="btn-gold" type="submit" disabled={loading || !room}
              style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
              {loading ? (
                <><span className="spinner-ring" style={{ width: 16, height: 16, borderWidth: 2 }} /> Confirming...</>
              ) : "Confirm Booking →"}
            </button>
          </form>
        </div>

        {/* Price Summary */}
        <div className="section-card glass-card-gold">
          <div className="section-card-title" style={{ marginBottom: "1.25rem" }}>Price Summary</div>

          {room && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Room</span>
                <span style={{ fontWeight: 600 }}>{room.roomNo} ({room.type})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Rate</span>
                <span style={{ fontWeight: 600 }}>${room.price}/night</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Nights</span>
                <span style={{ fontWeight: 600 }}>{nights || "—"}</span>
              </div>
              <div className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: "1rem" }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--gold)" }}>
                  {total > 0 ? `${total}` : "—"}
                </span>
              </div>
            </div>
          )}

          {room?.amenities?.length > 0 && (
            <div style={{ marginTop: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                Amenities
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {room.amenities.map((a) => <span key={a} className="amenity-chip">{a}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
