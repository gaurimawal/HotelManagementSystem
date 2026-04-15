import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";
import { currency } from "../../utils/helpers";

export default function BookingHistoryPage() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  const load = () => bookingService.getMyBookings().then(setRows).catch((e) => setErr(e.response?.data?.message || e.message));
  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    await bookingService.cancelBooking(id);
    load();
  };

  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>Booking History</h5>{err ? <div className="alert alert-danger">{err}</div> : null}<div className="table-responsive"><table className="table"><thead><tr><th>Room</th><th>Status</th><th>Invoice</th><th></th></tr></thead><tbody>{rows.length ? rows.map((r) => <tr key={r._id}><td>{r.room?.roomNo}</td><td>{r.status}</td><td>{currency(r.totalAmount || 0)}</td><td>{r.status !== "Cancelled" ? <button className="btn btn-sm btn-outline-danger" onClick={() => cancel(r._id)}>Cancel</button> : null}</td></tr>) : <tr><td colSpan="4">No data</td></tr>}</tbody></table></div></div></div>;
}
