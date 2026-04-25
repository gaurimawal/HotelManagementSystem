import { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import analyticsService from "../../services/analyticsService";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "var(--surface-2)", border: "1px solid var(--border-2)",
        borderRadius: "10px", padding: "10px 14px", fontSize: "0.82rem"
      }}>
        <div style={{ color: "var(--text-muted)", marginBottom: "4px" }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboardPage() {
  const [kpi, setKpi] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    adminService.getKpis().then(setKpi).catch(() => setKpi(null));
    analyticsService.getRevenue().then(setChartData).catch(() => setChartData([]));
  }, []);

  const cards = kpi ? [
    { label: "Total Revenue", value: `${kpi.totalRevenue.toLocaleString()}`, icon: "💰", variant: "gold", sub: "All non-cancelled bookings" },
    { label: "Occupancy Rate", value: `${kpi.occupancy}%`, icon: "🏨", variant: "blue", sub: "Current occupancy" },
    { label: "Total Bookings", value: kpi.totalBookings, icon: "📅", variant: "green", sub: "All time" },
    { label: "Total Rooms", value: kpi.totalRooms, icon: "🛏️", variant: "red", sub: "In inventory" },
  ] : [];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Overview of hotel operations and performance</p>
        </div>
      </div>

      {/* KPI Grid */}
      {kpi ? (
        <div className="grid-4" style={{ marginBottom: "1.75rem" }}>
          {cards.map((c) => (
            <div key={c.label} className={`kpi-card ${c.variant} fade-in`}>
              <div className="kpi-icon" style={{
                background: c.variant === "gold" ? "rgba(212,160,23,0.15)"
                  : c.variant === "blue" ? "rgba(56,189,248,0.15)"
                  : c.variant === "green" ? "rgba(34,197,94,0.15)"
                  : "rgba(239,68,68,0.15)"
              }}>
                {c.icon}
              </div>
              <div className="kpi-label">{c.label}</div>
              <div className="kpi-value">{c.value}</div>
              <div className="kpi-sub">{c.sub}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loader-overlay"><div className="spinner-ring" /><span>Loading KPIs...</span></div>
      )}

      {/* Chart */}
      <div className="section-card">
        <div className="section-card-header">
          <div className="section-card-title">📈 Revenue & Bookings Trend</div>
        </div>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4a017" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d4a017" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#d4a017" fill="url(#revGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="bookings" stroke="#38bdf8" fill="url(#bkGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
            No chart data yet — make some bookings!
          </div>
        )}
      </div>
    </div>
  );
}
