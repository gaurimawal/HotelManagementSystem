import { useEffect, useState } from "react";
import staffService from "../../services/staffService";

export default function BookingManagementPage() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  const load = () => staffService.getBookings().then(setRows).catch((e) => setErr(e.response?.data?.message || e.message));
  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    await staffService.updateBookingStatus(id, status);
    load();
  };

  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>Booking Management</h5>{err ? <div className="alert alert-danger">{err}</div> : null}<table className="table"><thead><tr><th>Guest</th><th>Room</th><th>Status</th></tr></thead><tbody>{rows.map((r) => <tr key={r._id}><td>{r.user?.name}</td><td>{r.room?.roomNo}</td><td><select className="form-select" value={r.status} onChange={(e) => update(r._id, e.target.value)}><option>Check-in Pending</option><option>Checked-in</option><option>Checked-out</option><option>Confirmed</option><option>Cancelled</option></select></td></tr>)}</tbody></table></div></div>;
}
