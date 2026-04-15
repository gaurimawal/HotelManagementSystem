import { useEffect, useState } from "react";
import staffService from "../../services/staffService";

export default function StaffDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    staffService.getBookings().then(setBookings).catch(() => setBookings([]));
    staffService.getServiceRequests().then(setRequests).catch(() => setRequests([]));
  }, []);
  return <div className="row g-3"><div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h5>Assigned Bookings</h5><h3>{bookings.length}</h3></div></div></div><div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h5>Check-ins Pending</h5><h3>{bookings.filter((b) => b.status === "Check-in Pending").length}</h3></div></div></div><div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h5>Service Requests</h5><h3>{requests.length}</h3></div></div></div></div>;
}
