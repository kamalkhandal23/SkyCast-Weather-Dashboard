import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  selectedCity: string | null;
  isOpen: boolean;
}

const initialState: UIState = {
  selectedCity: null,
  isOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCityModal: (state, action) => {
      state.selectedCity = action.payload;
      state.isOpen = true;
    },
    closeCityModal: (state) => {
      state.isOpen = false;
      state.selectedCity = null;
    },
  },
});

export const { openCityModal, closeCityModal } = uiSlice.actions;
export default uiSlice.reducer;
