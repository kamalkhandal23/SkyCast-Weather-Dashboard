import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
    cities: string[];
}

const initialState: FavoritesState = {
    cities: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            if (!state.cities.includes(action.payload)) {
                state.cities.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.cities));
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.cities = state.cities.filter(city => city !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.cities));
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
