import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";
import type { RootState } from "../app/store";
import { X } from "lucide-react";
import { removeCity } from "../features/weather/weatherSlice";
import type { AppDispatch } from "../app/store";

interface Props {
  city: string;
  temp: number;
  condition: string;
}

export default function WeatherCard({ city, temp, condition }: Props) {
 const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const favorites = useSelector((state: RootState) => state.favorites.cities);

  const isFavorite = favorites.includes(city);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    isFavorite
      ? dispatch(removeFavorite(city))
      : dispatch(addFavorite(city));
  };


  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCity(city));
  };
  

  return (
    <div
      onClick={() => navigate(`/city/${city}`)}
      className="relative bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-xl p-5 hover:scale-[1.02] transition transform cursor-pointer shadow-lg"
    >
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3"
      >
        <Star
          size={20}
          className={isFavorite ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}
        />
      </button>

      <button
  onClick={handleRemove}
  className="absolute bottom-3 right-3 text-slate-400 hover:text-red-400"
>
  <X size={18} />
</button>


      <h2 className="text-xl font-semibold">{city}</h2>
      <p className="text-4xl font-bold mt-2">{temp}°</p>
      <p className="text-slate-400 mt-1">{condition}</p>
    </div>
  );
}
