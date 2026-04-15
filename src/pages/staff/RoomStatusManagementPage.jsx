import { useEffect, useState } from "react";
import roomService from "../../services/roomService";
import staffService from "../../services/staffService";

export default function RoomStatusManagementPage() {
  const [rows, setRows] = useState([]);

  const load = () => roomService.getRooms().then(setRows).catch(() => setRows([]));
  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    await staffService.updateRoomStatus(id, status);
    load();
  };

  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>Room Status Management</h5><table className="table"><thead><tr><th>Room</th><th>Type</th><th>Status</th></tr></thead><tbody>{rows.map((r) => <tr key={r._id}><td>{r.roomNo}</td><td>{r.type}</td><td><select className="form-select" value={r.status} onChange={(e) => update(r._id, e.target.value)}><option>Available</option><option>Occupied</option><option>Maintenance</option></select></td></tr>)}</tbody></table></div></div>;
}
