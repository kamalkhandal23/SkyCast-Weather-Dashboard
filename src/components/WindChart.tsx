import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  export default function WindChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: "#0f172a", border: "none" }} />
          <Line type="monotone" dataKey="speed" stroke="#fb923c" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  