import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { getForecastByCity } from "../features/weather/weatherSlice";
import ForecastChart from "../components/ForecastChart";
import { ArrowLeft } from "lucide-react";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg text-center">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}

export default function CityDetails() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const unit = useSelector((state: RootState) => state.settings.unit);
  const forecast = useSelector(
    (state: RootState) => state.weather.forecast[cityName || ""]
  );

  useEffect(() => {
    if (cityName) {
      dispatch(getForecastByCity({ city: cityName, unit }));
    }
  }, [cityName, unit, dispatch]);

  const chartData =
    forecast?.list?.slice(0, 10).map((item: any) => ({
      time: item.dt_txt.slice(5, 16),
      temp: item.main.temp,
    })) || [];

  const hourlyData = forecast?.list?.slice(0, 8) || [];

  const dailyData =
    forecast?.list?.filter((item: any) => item.dt_txt.includes("12:00:00")) || [];

  const currentStats = forecast?.list?.[0];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-yellow-400 mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">{cityName} Forecast</h1>

      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
        <ForecastChart data={chartData} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {hourlyData.map((item: any, i: number) => (
            <div
              key={i}
              className="bg-slate-800 p-4 rounded-lg min-w-[90px] text-center"
            >
              <p className="text-sm text-slate-400">
                {new Date(item.dt * 1000).getHours()}:00
              </p>
              <p className="text-lg font-semibold">
                {Math.round(item.main.temp)}°
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {item.weather[0].main}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {dailyData.map((day: any, i: number) => (
            <div key={i} className="bg-slate-800 p-4 rounded-lg text-center">
              <p className="text-sm text-slate-400">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <p className="text-xl font-bold mt-1">
                {Math.round(day.main.temp)}°
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {day.weather[0].main}
              </p>
            </div>
          ))}
        </div>
      </div>

      {currentStats && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Pressure" value={`${currentStats.main.pressure} hPa`} />
          <Stat label="Humidity" value={`${currentStats.main.humidity}%`} />
          <Stat
            label="Wind Speed"
            value={`${currentStats.wind.speed} ${
              unit === "metric" ? "m/s" : "mph"
            }`}
          />
          <Stat
            label="Feels Like"
            value={`${Math.round(currentStats.main.feels_like)}°`}
          />
        </div>
      )}
    </div>
  );
}
