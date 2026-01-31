import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  export default function PrecipitationChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" unit="%" />
          <Tooltip contentStyle={{ background: "#0f172a", border: "none" }} />
          <Line
            type="monotone"
            dataKey="rain"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  