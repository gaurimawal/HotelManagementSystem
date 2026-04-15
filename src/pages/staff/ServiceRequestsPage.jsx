import { useEffect, useState } from "react";
import staffService from "../../services/staffService";

export default function ServiceRequestsPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => { staffService.getServiceRequests().then(setRows).catch(() => setRows([])); }, []);
  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>Service Requests</h5><table className="table"><thead><tr><th>Room</th><th>Request</th><th>Priority</th><th>Status</th></tr></thead><tbody>{rows.length ? rows.map((r) => <tr key={r._id}><td>{r.room?.roomNo}</td><td>{r.request}</td><td>{r.priority}</td><td>{r.status}</td></tr>) : <tr><td colSpan="4">No data</td></tr>}</tbody></table></div></div>;
}
