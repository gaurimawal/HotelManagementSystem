import { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import roomService from "../../services/roomService";

export default function RoomManagementPage() {
  const [rows, setRows] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomNo: "", type: "Standard", price: "", status: "Available" });

  const load = () => roomService.getRooms().then(setRows).catch(() => setRows([]));
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newRoom.roomNo || !newRoom.price) return;
    await adminService.createRoom({ ...newRoom, price: Number(newRoom.price), amenities: [], images: [] });
    setNewRoom({ roomNo: "", type: "Standard", price: "", status: "Available" });
    load();
  };

  const del = async (id) => {
    await adminService.deleteRoom(id);
    load();
  };

  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>Room Management</h5><div className="row g-2 mb-3"><div className="col-md-3"><input className="form-control" placeholder="Room No" value={newRoom.roomNo} onChange={(e) => setNewRoom({ ...newRoom, roomNo: e.target.value })} /></div><div className="col-md-3"><select className="form-select" value={newRoom.type} onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}><option>Standard</option><option>Deluxe</option><option>Suite</option></select></div><div className="col-md-3"><input className="form-control" type="number" placeholder="Price" value={newRoom.price} onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })} /></div><div className="col-md-3"><button className="btn btn-primary w-100" onClick={add}>Add Room</button></div></div><table className="table"><thead><tr><th>Room</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody>{rows.map((r) => <tr key={r._id}><td>{r.roomNo}</td><td>{r.type}</td><td>{r.status}</td><td><button className="btn btn-outline-danger btn-sm" onClick={() => del(r._id)}>Delete</button></td></tr>)}</tbody></table></div></div>;
}
