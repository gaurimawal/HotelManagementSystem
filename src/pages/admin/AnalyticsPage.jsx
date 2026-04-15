import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import analyticsService from "../../services/analyticsService";

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  useEffect(() => { analyticsService.getRevenueSeries().then(setData).catch(() => setData([])); }, []);
  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>Analytics</h5><div style={{ height: 320 }}><ResponsiveContainer><LineChart data={data}><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#0d6efd" /><Line type="monotone" dataKey="bookings" stroke="#198754" /></LineChart></ResponsiveContainer></div></div></div>;
}
