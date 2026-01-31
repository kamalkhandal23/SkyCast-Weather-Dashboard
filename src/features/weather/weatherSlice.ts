import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentWeather, fetchForecast } from "./weatherAPI";

export interface SavedCity {
    display: string;
    query: string;
}

interface WeatherState {
    current: Record<string, any>;
    forecast: Record<string, any>;
    savedCities: SavedCity[];
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    current: {},
    forecast: {},
    savedCities: JSON.parse(localStorage.getItem("savedCities") || "[]"),
    loading: false,
    error: null,
};

export const getWeatherByCity = createAsyncThunk(
    "weather/getWeatherByCity",
    async (
        { city, unit }: { city: string; unit: string },
        { getState }
    ) => {
        const state = getState() as { weather: WeatherState };
        const cached = state.weather.current[city];

        const now = Date.now();
        const ONE_MINUTE = 60 * 1000;

        if (cached && cached.unit === unit && now - cached.lastFetched < ONE_MINUTE) {
            return { city, data: cached.data, cached: true };
        }
        const data = await fetchCurrentWeather(city, unit);
        return { city, data, cached: false };
    }
);

export const getForecastByCity = createAsyncThunk(
    "weather/getForecastByCity",
    async ({ city, unit }: { city: string; unit: string }) => {
        const data = await fetchForecast(city, unit);
        return { city, data };
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        addCity: (state, action: PayloadAction<SavedCity>) => {
            const exists = state.savedCities.some(c => c.display === action.payload.display);
            if (!exists) {
                state.savedCities.push(action.payload);
                localStorage.setItem("savedCities", JSON.stringify(state.savedCities));
            }
        },
        removeCity: (state, action: PayloadAction<string>) => {
            state.savedCities = state.savedCities.filter(c => c.display !== action.payload);
            localStorage.setItem("savedCities", JSON.stringify(state.savedCities));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherByCity.fulfilled, (state, action) => {
                state.current[action.payload.city] = {
                    data: action.payload.data,
                    lastFetched: Date.now(),
                };
            })

            .addCase(getForecastByCity.fulfilled, (state, action) => {
                state.forecast[action.payload.city] = action.payload.data;
            })


    },
});

export const { addCity, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
