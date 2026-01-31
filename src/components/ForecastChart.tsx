import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  
  interface Props {
    forecast: any;
  }
  
  export default function ForecastChart({ forecast }: Props) {
    if (!forecast || !forecast.list) return <p>Loading forecast...</p>;
  
    const chartData = forecast.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).getHours() + ":00",
      temp: Math.round(item.main.temp),
    }));
  
    return (
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  