import { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import roomService from "../../services/roomService";

const TYPES = ["Standard", "Deluxe", "Suite"];
const STATUSES = ["Available", "Occupied", "Maintenance"];
const EMPTY = { roomNo: "", type: "Standard", price: "", status: "Available", amenities: "" };

function statusBadge(status) {
  const cls = status === "Available" ? "badge-available"
    : status === "Occupied" ? "badge-occupied" : "badge-maintenance";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export default function RoomManagementPage() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const load = () => {
    setLoading(true);
    roomService.getRooms().then(setRooms).catch(() => setError("Failed to load rooms")).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (r) => {
    setForm({ roomNo: r.roomNo, type: r.type, price: r.price, status: r.status, amenities: (r.amenities || []).join(", ") });
    setEditId(r._id);
    setShowModal(true);
  };

  const save = async () => {
    if (!form.roomNo || !form.price) return;
    const payload = { ...form, price: Number(form.price), amenities: form.amenities ? form.amenities.split(",").map(s => s.trim()) : [] };
    try {
      if (editId) await adminService.updateRoom(editId, payload);
      else await adminService.createRoom(payload);
      setShowModal(false);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Save failed");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    await adminService.deleteRoom(id).catch(() => {});
    load();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Room Management</h1>
          <p className="page-subtitle">Add, edit, or remove hotel rooms</p>
        </div>
        <button className="btn-gold" onClick={openAdd}>+ Add Room</button>
      </div>

      {error && <div className="alert-dark error" style={{ marginBottom: "1rem" }}>⚠️ {error}</div>}

      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="loader-overlay"><div className="spinner-ring" /><span>Loading rooms...</span></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dark-table">
              <thead>
                <tr>
                  <th>Room No</th><th>Type</th><th>Price/Night</th><th>Status</th><th>Amenities</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No rooms found</td></tr>
                ) : rooms.map((r) => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: 700, color: "var(--gold)" }}>{r.roomNo}</td>
                    <td>{r.type}</td>
                    <td style={{ fontWeight: 600 }}>${r.price}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {(r.amenities || []).slice(0, 3).join(", ") || "—"}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn-ghost" style={{ padding: "5px 12px", fontSize: "0.8rem" }} onClick={() => openEdit(r)}>✏️ Edit</button>
                        <button className="btn-danger-sm" onClick={() => del(r._id)}>🗑 Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editId ? "Edit Room" : "Add New Room"}</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="form-label-dark">Room No</label>
                <input className="input-dark" placeholder="e.g. A-101" value={form.roomNo} onChange={(e) => setForm({ ...form, roomNo: e.target.value })} />
              </div>
              <div>
                <label className="form-label-dark">Price / Night </label>
                <input className="input-dark" type="number" placeholder="150" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <label className="form-label-dark">Type</label>
                <select className="select-dark" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label-dark">Status</label>
                <select className="select-dark" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <label className="form-label-dark">Amenities (comma separated)</label>
              <input className="input-dark" placeholder="WiFi, TV, Mini Bar" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem", justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-gold" onClick={save}>{editId ? "Save Changes" : "Add Room"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
