import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";

export default function CustomerDashboardPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => { bookingService.getMyBookings().then(setRows).catch(() => setRows([])); }, []);
  const confirmed = rows.filter((x) => x.status === "Confirmed").length;
  return <div className="row g-3"><div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h5>Bookings</h5><h3>{rows.length}</h3></div></div></div><div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h5>Confirmed</h5><h3>{confirmed}</h3></div></div></div><div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h5>Cancelled</h5><h3>{rows.filter((x) => x.status === "Cancelled").length}</h3></div></div></div></div>;
}
