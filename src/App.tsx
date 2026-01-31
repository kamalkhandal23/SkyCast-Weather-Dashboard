import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityDetails from "./pages/CityDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/city/:cityName" element={<CityDetails />} />
    </Routes>
  );
}
