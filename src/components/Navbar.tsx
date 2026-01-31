import { useDispatch, useSelector } from "react-redux";
import { setUnit } from "../features/settings/settingsSlice";
import type { RootState } from "../app/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.settings.unit);

  return (
    <div className="flex justify-between items-center p-4 bg-slate-800 border-b border-slate-700">
      <h1 className="text-xl font-bold text-white">SkyCast</h1>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch(setUnit("metric"))}
          className={`px-3 py-1 rounded ${
            unit === "metric" ? "bg-yellow-400 text-black" : "bg-slate-700 text-white"
          }`}
        >
          °C
        </button>

        <button
          onClick={() => dispatch(setUnit("imperial"))}
          className={`px-3 py-1 rounded ${
            unit === "imperial" ? "bg-yellow-400 text-black" : "bg-slate-700 text-white"
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
}
