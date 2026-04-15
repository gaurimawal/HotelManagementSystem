import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import roomService from "../../services/roomService";
import { currency } from "../../utils/helpers";

export default function RoomListingPage() {
  const [rooms, setRooms] = useState([]);
  const [f, setF] = useState({ type: "", max: "", status: "" });
  const [err, setErr] = useState("");

  useEffect(() => { roomService.getRooms().then(setRooms).catch((e) => setErr(e.response?.data?.message || e.message)); }, []);

  const filtered = useMemo(() => rooms.filter((r) => (!f.type || r.type === f.type) && (!f.status || r.status === f.status) && (!f.max || r.price <= Number(f.max))), [rooms, f]);

  return <>{err ? <div className="alert alert-danger">{err}</div> : null}<div className="card border-0 shadow-sm mb-3"><div className="card-body row g-2"><div className="col-md-4"><select className="form-select" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}><option value="">All types</option><option>Standard</option><option>Deluxe</option><option>Suite</option></select></div><div className="col-md-4"><input className="form-control" placeholder="Max price" value={f.max} onChange={(e) => setF({ ...f, max: e.target.value })} /></div><div className="col-md-4"><select className="form-select" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}><option value="">Any status</option><option>Available</option><option>Occupied</option><option>Maintenance</option></select></div></div></div><div className="row g-3">{filtered.length ? filtered.map((r) => <div key={r._id} className="col-md-4"><div className="card h-100 border-0 shadow-sm"><div className="card-body"><h6>{r.roomNo}</h6><p className="mb-1">{r.type}</p><p className="fw-semibold mb-1">{currency(r.price)}</p><span className="badge text-bg-secondary mb-3">{r.status}</span><div className="d-flex gap-2"><Link className="btn btn-sm btn-outline-primary" to={`/customer/rooms/${r._id}`}>Details</Link><Link className="btn btn-sm btn-primary" to={`/customer/book/${r._id}`}>Book</Link></div></div></div></div>) : <div className="col-12"><div className="alert alert-light border">No data</div></div>}</div></>;
}
