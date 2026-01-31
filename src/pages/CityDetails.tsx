import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { getForecastByCity } from "../features/weather/weatherSlice";
import ForecastChart from "../components/ForecastChart";
import { ArrowLeft } from "lucide-react";

export default function CityDetails() {
    const { cityName } = useParams<{ cityName: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const unit = useSelector((state: RootState) => state.settings.unit);

    const decodedCity = decodeURIComponent(cityName || "");
    const apiQuery = decodedCity.replace(", ", ",");


    const forecast = useSelector(
        (state: RootState) => state.weather.forecast[apiQuery]
    );

    useEffect(() => {
        if (apiQuery && !forecast) {
            dispatch(getForecastByCity({ city: apiQuery, unit }));
        }
    }, [apiQuery, unit, dispatch]);


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
                <ForecastChart forecast={forecast} />
            </div>
        </div>
    );
}
