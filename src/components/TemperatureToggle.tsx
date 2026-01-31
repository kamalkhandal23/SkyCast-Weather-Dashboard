export default function TemperatureToggle() {
    return (
      <div className="flex bg-slate-700 rounded-full p-1 text-sm">
        <button className="px-3 py-1 rounded-full bg-yellow-400 text-black font-semibold">
          °C
        </button>
        <button className="px-3 py-1 rounded-full text-white">
          °F
        </button>
      </div>
    );
  }
  