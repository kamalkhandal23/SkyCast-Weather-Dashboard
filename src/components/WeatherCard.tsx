import { X, Droplets, Wind, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeCity } from "../features/weather/weatherSlice";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";
import { openCityModal } from "../features/ui/uiSlice";
import type { RootState, AppDispatch } from "../app/store";

interface Props {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  unit: "metric" | "imperial";
  icon: string; 
}


export default function WeatherCard({
  city,
  temp,
  condition,
  humidity,
  wind,
  unit,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.cities);
  const isFav = favorites.includes(city);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCity(city));
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFav) dispatch(removeFavorite(city));
    else dispatch(addFavorite(city));
  };

  return (
    <div
      onClick={() => dispatch(openCityModal(city))}
      className="relative bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-xl p-5 hover:scale-[1.02] transition transform cursor-pointer shadow-lg flex flex-col justify-between"
    >
      {/* REMOVE CITY */}
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 text-slate-400 hover:text-red-400"
      >
        <X size={18} />
      </button>

      {/* FAVORITE STAR */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 left-3 text-yellow-400"
      >
        <Star size={20} fill={isFav ? "#facc15" : "none"} />
      </button>

      <h2 className="text-lg font-semibold mt-4">{city}</h2>

      <div className="flex items-center justify-between mt-4">
        <p className="text-4xl font-bold">{temp}°</p>
      </div>

      <p className="text-slate-400 capitalize mt-2">{condition}</p>

      <div className="flex justify-between items-center text-sm text-slate-400 mt-4 border-t border-slate-700 pt-3">
        <div className="flex items-center gap-1">
          <Droplets size={16} /> {humidity}%
        </div>
        <div className="flex items-center gap-1">
          <Wind size={16} /> {wind} {unit === "metric" ? "m/s" : "mph"}
        </div>
      </div>
    </div>
  );
}
