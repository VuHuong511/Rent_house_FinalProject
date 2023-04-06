import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  minPrice: null,
  maxPrice: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    STORE_ROOMS(state, action) {
      state.rooms = action.payload.rooms;
    },
    GET_PRICE_RANGE(state, action) {
      console.log(action.payload);
      const { rooms } = action.payload;
      const array = [];
      rooms.map((room) => {
        const regularPrice = room.regularPrice;
        return array.push(regularPrice);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);
      state.maxPrice = max;
      state.minPrice = min;
    },
  },
});

export const { STORE_ROOMS, GET_PRICE_RANGE } = roomSlice.actions;

export const selectRooms = (state) => state.room.rooms;
export const selectMinPrice = (state) => state.room.minPrice;
export const selectMaxPrice = (state) => state.room.maxPrice;

export default roomSlice.reducer;
