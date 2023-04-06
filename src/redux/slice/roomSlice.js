import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    STORE_ROOMS(state, action) {
      // console.log(action.payload);
      // const { rooms } = action.payload;
      state.rooms = action.payload.rooms;
    },
  },
});

export const { STORE_ROOMS } = roomSlice.actions;

export const selectRooms = (state) => state.room.rooms;

export default roomSlice.reducer;
