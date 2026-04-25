import { useEffect, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import analyticsService from "../../services/analyticsService";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "var(--surface-2)", border: "1px solid var(--border-2)",
        borderRadius: "10px", padding: "10px 14px", fontSize: "0.82rem"
      }}>
        <div style={{ color: "var(--text-muted)", marginBottom: "4px", fontWeight: 700 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color, fontWeight: 600 }}>
            {p.name === "revenue" ? "Revenue" : "Bookings"}: {p.name === "revenue" ? `${p.value.toLocaleString()}` : p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService.getRevenueSeries
      ? analyticsService.getRevenueSeries().then(setData).catch(() => setData([]))
      : analyticsService.getRevenue().then(setData).catch(() => setData([]));
    setLoading(false);
  }, []);

  const totalRevenue = data.reduce((s, d) => s + (d.revenue || 0), 0);
  const totalBookings = data.reduce((s, d) => s + (d.bookings || 0), 0);
  const bestMonth = data.reduce((best, d) => (!best || d.revenue > best.revenue ? d : best), null);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Revenue and booking performance insights</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
        {[
          { label: "YTD Revenue", value: `${totalRevenue.toLocaleString()}`, icon: "💰" },
          { label: "YTD Bookings", value: totalBookings, icon: "📅" },
          { label: "Best Month", value: bestMonth?.month || "—", icon: "🏆" },
        ].map((c) => (
          <div key={c.label} className="kpi-card gold fade-in">
            <div className="kpi-icon" style={{ background: "rgba(212,160,23,0.15)" }}>{c.icon}</div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-value" style={{ fontSize: "1.6rem" }}>{c.value}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="loader-overlay"><div className="spinner-ring" /><span>Loading analytics...</span></div>
      ) : data.length === 0 ? (
        <div className="section-card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          No analytics data yet — make some bookings first!
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          {/* Revenue Area Chart */}
          <div className="section-card">
            <div className="section-card-header">
              <div className="section-card-title">📈 Monthly Revenue</div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a017" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#d4a017" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#d4a017" fill="url(#revG)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bookings Bar Chart */}
          <div className="section-card">
            <div className="section-card-header">
              <div className="section-card-title">📊 Monthly Bookings</div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="bookings" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
