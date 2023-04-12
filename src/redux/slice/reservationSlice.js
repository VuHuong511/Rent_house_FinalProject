import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservationHistory: [],
  totalReservationAmount: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    STORE_RESERVATION(state, action) {
      state.reservationHistory = action.payload;
    },
    CALCULATOR_TOTAL_RESERVATION(state, action) {
      const array = [];
      state.reservationHistory.map((item) => {
        const { reservationAmount } = item;
        return array.push(reservationAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalReservationAmount = totalAmount;
    },
  },
});

export const { STORE_RESERVATION, CALCULATOR_TOTAL_RESERVATION } =
  reservationSlice.actions;
export const selectReservationHistory = (state) =>
  state.reservation.reservationHistory;
export const selectReservationAmount = (state) =>
  state.reservation.totalReservationAmount;
export default reservationSlice.reducer;
