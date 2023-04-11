import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservationHistory: [],
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    STORE_RESERVATION(state, action) {
      state.reservationHistory = action.payload;
    },
  },
});

export const { STORE_RESERVATION } = reservationSlice.actions;
export const selectReservationHistory = (state) =>
  state.reservation.reservationHistory;
export default reservationSlice.reducer;
