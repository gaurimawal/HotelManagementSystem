import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

export default function AdminDashboardPage() {
  const [kpi, setKpi] = useState(null);
  useEffect(() => { adminService.getKpis().then(setKpi).catch(() => setKpi(null)); }, []);
  return <div className="row g-3">{kpi ? <><div className="col-md-3"><div className="card border-0 shadow-sm"><div className="card-body"><div className="small text-muted">Revenue</div><h4>${kpi.totalRevenue}</h4></div></div></div><div className="col-md-3"><div className="card border-0 shadow-sm"><div className="card-body"><div className="small text-muted">Occupancy</div><h4>{kpi.occupancy}%</h4></div></div></div><div className="col-md-3"><div className="card border-0 shadow-sm"><div className="card-body"><div className="small text-muted">Bookings</div><h4>{kpi.totalBookings}</h4></div></div></div><div className="col-md-3"><div className="card border-0 shadow-sm"><div className="card-body"><div className="small text-muted">Rooms</div><h4>{kpi.totalRooms}</h4></div></div></div></> : <div className="col-12"><div className="alert alert-light border">No KPI data</div></div>}</div>;
}
