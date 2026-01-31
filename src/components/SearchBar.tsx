import { useState } from "react";
import { Search } from "lucide-react";
import { searchCities } from "../features/weather/weatherAPI";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity, addCity } from "../features/weather/weatherSlice";
import type { AppDispatch, RootState } from "../app/store";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const unit = useSelector((state: RootState) => state.settings.unit);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length < 2) return setResults([]);

    try {
      const cities = await searchCities(value);
      const validCities = cities.filter((c: any) => c.lat && c.lon);
      setResults(validCities);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  };

  const selectCity = (city: any) => {
    if (!city?.name || !city?.country) return;

    const displayName = `${city.name}, ${city.country}`; 
    const apiQuery = `${city.name},${city.country}`;     

    dispatch(addCity({ display: displayName, query: apiQuery }));
    dispatch(getWeatherByCity({ city: apiQuery, unit }));

    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search city..."
        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />

      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
          {results.map((city, idx) => (
            <div
              key={idx}
              onClick={() => selectCity(city)}
              className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-sm"
            >
              {city.name}, {city.state ? `${city.state}, ` : ""}{city.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
