import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city: string, unit: string) => {
    if (!city) return null;

    const res = await axios.get(`${BASE_URL}/weather`, {
        params: {
            q: city,
            units: unit,
            appid: API_KEY,
        },
    });
    return res.data;
};


export const fetchForecast = async (city: string, unit: string) => {
    const res = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            q: city,
            units: unit,
            appid: API_KEY,
        },
    });
    return res.data;
};

export const searchCities = async (query: string) => {
    const res = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
        params: {
            q: query,
            limit: 5,
            appid: API_KEY,
        },
    });
    return res.data;
};
