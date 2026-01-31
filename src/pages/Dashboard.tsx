import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { getWeatherByCity, addCity, getForecastByCity } from "../features/weather/weatherSlice";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import CityWeatherModal from "../components/CityWeatherModal";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { current, loading, savedCities } = useSelector((state: RootState) => state.weather);
    const unit = useSelector((state: RootState) => state.settings.unit);
    const favorites = useSelector((state: RootState) => state.favorites.cities);

    useEffect(() => {
        const interval = setInterval(() => {
          savedCities.forEach(cityObj => {
            dispatch(getWeatherByCity({ city: cityObj.query, unit }));
            dispatch(getForecastByCity({ city: cityObj.query, unit }));
          });
        }, 60000);
      
        return () => clearInterval(interval);
      }, [savedCities, unit, dispatch]);
      

    useEffect(() => {
        if (savedCities.length === 0) {
            const defaults = [
                { display: "Jaipur, IN", query: "Jaipur,IN" },
                { display: "Delhi, IN", query: "Delhi,IN" },
                { display: "Mumbai, IN", query: "Mumbai,IN" },
            ];
            defaults.forEach(city => dispatch(addCity(city)));
        }
    }, [savedCities, dispatch]);

    useEffect(() => {
        savedCities.forEach((cityObj) => {
            dispatch(getWeatherByCity({ city: cityObj.query, unit }));
        });
    }, [savedCities, unit, dispatch]);


    const sortedCities = [
        ...savedCities.filter(city => favorites.includes(city.display)),
        ...savedCities.filter(city => !favorites.includes(city.display)),
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Navbar />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h1 className="text-3xl font-bold">Weather Overview</h1>
                    <SearchBar />
                </div>

                {loading && <p className="text-slate-400">Loading weather...</p>}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sortedCities.map((cityObj) => {
                        const data = current[cityObj.query]?.data;

                        if (!data) return null;

                        return (
                            <WeatherCard
                                key={cityObj.display}
                                city={cityObj.display}
                                temp={Math.round(data.main.temp)}
                                condition={data.weather[0].main}
                                icon={data.weather[0].icon}
                                humidity={data.main.humidity}
                                wind={data.wind.speed}
                                unit={unit}
                            />
                            

                        );
                    })}
                </div>
                <CityWeatherModal />

            </div>
        </div>
    );
}
