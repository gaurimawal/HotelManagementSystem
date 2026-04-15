import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

export default function BookingOverviewPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => { adminService.getAllBookings().then(setRows).catch(() => setRows([])); }, []);
  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>Booking Overview</h5><table className="table"><thead><tr><th>ID</th><th>Guest</th><th>Room</th><th>Status</th></tr></thead><tbody>{rows.map((r) => <tr key={r._id}><td>{r._id.slice(-6)}</td><td>{r.user?.name}</td><td>{r.room?.roomNo}</td><td>{r.status}</td></tr>)}</tbody></table></div></div>;
}
