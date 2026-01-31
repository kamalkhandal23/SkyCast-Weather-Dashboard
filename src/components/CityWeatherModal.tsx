import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { closeCityModal } from "../features/ui/uiSlice";
import { getForecastByCity } from "../features/weather/weatherSlice";
import ForecastChart from "./ForecastChart";
import PrecipitationChart from "./PrecipitationChart";
import WindChart from "./WindChart";
import { X, Droplets, Wind, Gauge, Sun } from "lucide-react";

export default function CityWeatherModal() {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedCity, isOpen } = useSelector((state: RootState) => state.ui);
    const unit = useSelector((state: RootState) => state.settings.unit);

    const forecastState = useSelector(
        (state: RootState) => state.weather.forecast[selectedCity || ""]
    );

    const forecast = forecastState?.data;

    useEffect(() => {
        if (selectedCity) {
            dispatch(getForecastByCity({ city: selectedCity, unit }));
        }
    }, [selectedCity, unit, dispatch]);

    if (!isOpen || !forecast) return null;

    const now = new Date();

    const hourly = forecast.list
        .filter((item: any) => new Date(item.dt_txt) > now)
        .slice(0, 8);

    const hourlyChartData = hourly.map((item: any) => ({
        time: new Date(item.dt_txt).getHours() + ":00",
        temp: Math.round(item.main.temp),
    }));

    const precipitationData = hourly.map((item: any) => ({
        time: new Date(item.dt_txt).getHours() + ":00",
        rain: Math.round((item.pop || 0) * 100),
    }));

    const windData = hourly.map((item: any) => ({
        time: new Date(item.dt_txt).getHours() + ":00",
        speed: item.wind.speed,
    }));

    const today = new Date().toISOString().split("T")[0];
    const dailyMap: Record<string, any> = {};

    forecast.list.forEach((item: any) => {
        const date = item.dt_txt.split(" ")[0];
        if (date === today) return;

        if (!dailyMap[date]) {
            dailyMap[date] = { temps: [], condition: item.weather[0].main };
        }
        dailyMap[date].temps.push(item.main.temp);
    });

    const dailyData = Object.entries(dailyMap)
        .slice(0, 7)
        .map(([date, data]: any) => ({
            date,
            temp: Math.round(
                data.temps.reduce((a: number, b: number) => a + b, 0) /
                data.temps.length
            ),
            condition: data.condition,
        }));

    const current = forecast.list[0];

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
            <div className="bg-slate-900 w-full h-[92vh] sm:h-auto sm:max-h-[90vh] sm:max-w-6xl rounded-t-2xl sm:rounded-2xl border border-slate-700 shadow-2xl overflow-y-auto">

                <div className="sticky top-0 bg-slate-900 z-10 flex justify-between items-center px-5 py-4 border-b border-slate-700">
                    <h2 className="text-xl sm:text-3xl font-bold">{selectedCity} Forecast</h2>
                    <button onClick={() => dispatch(closeCityModal())}>
                        <X className="text-slate-400 hover:text-red-400" size={22} />
                    </button>
                </div>

                <div className="p-5 space-y-10">

                    {/* ===== CHART GRID ===== */}
                    {/* ===== TOP ANALYTICS GRID ===== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* 🌡 Temperature Chart */}
                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <h3 className="text-sm font-semibold mb-3 text-slate-300">Temperature Trend</h3>
                            <div className="h-56 w-full">
                                <ForecastChart data={hourlyChartData} />
                            </div>
                        </div>

                        {/* 🕒 Hourly Forecast */}
                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <h3 className="text-sm font-semibold mb-3 text-slate-300">Next Hours</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {hourly.map((item: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-900 p-3 rounded-lg text-center border border-slate-700"
                                    >
                                        <p className="text-xs text-slate-400">
                                            {new Date(item.dt_txt).getHours()}:00
                                        </p>
                                        <p className="text-lg font-bold">{Math.round(item.main.temp)}°</p>
                                        <p className="text-xs text-slate-400">{item.weather[0].main}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== SECOND ROW CHARTS ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <h3 className="text-sm font-semibold mb-3 text-slate-300">Precipitation %</h3>
                            <div className="h-56 w-full">
                                <PrecipitationChart data={precipitationData} />
                            </div>
                        </div>

                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <h3 className="text-sm font-semibold mb-3 text-slate-300">Wind Speed</h3>
                            <div className="h-56 w-full">
                                <WindChart data={windData} />
                            </div>
                        </div>

                    </div>


                    {/* ===== DETAILED STATS ===== */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Detailed Stats</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            <Stat icon={<Droplets size={18} />} label="Humidity" value={`${current.main.humidity}%`} />
                            <Stat icon={<Gauge size={18} />} label="Pressure" value={`${current.main.pressure} hPa`} />
                            <Stat icon={<Wind size={18} />} label="Wind" value={`${current.wind.speed} ${unit === "metric" ? "m/s" : "mph"}`} />
                            <Stat icon={<Sun size={18} />} label="Feels Like" value={`${Math.round(current.main.feels_like)}°`} />
                        </div>
                    </div>

                    {/* ===== 7 DAY FORECAST ===== */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                            {dailyData.map((day, idx) => (
                                <div key={idx} className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                    <p className="text-sm text-slate-400">
                                        {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                                    </p>
                                    <p className="text-xl font-bold mt-1">{day.temp}°</p>
                                    <p className="text-xs text-slate-400">{day.condition}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}




function Stat({ icon, label, value }: any) {
    return (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
            <div className="flex justify-center mb-2 text-yellow-400">{icon}</div>
            <p className="text-xs text-slate-400">{label}</p>
            <p className="text-lg font-bold mt-1">{value}</p>
        </div>
    );
}
