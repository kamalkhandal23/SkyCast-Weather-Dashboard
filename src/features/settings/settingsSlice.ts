import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
    unit: "metric" | "imperial";
}

const initialState: SettingsState = {
    unit: "metric",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setUnit: (state, action: PayloadAction<"metric" | "imperial">) => {
            state.unit = action.payload;
        },
    },
});

export const { setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
