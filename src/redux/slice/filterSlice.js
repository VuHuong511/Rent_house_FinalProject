import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredRooms: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { rooms, search } = action.payload;
      if (Array.isArray(rooms)) {
        const tempRooms = rooms.filter((room) =>
          room.name.toLowerCase().includes(search.toLowerCase())
        );
        state.filteredRooms = tempRooms;
      }
    },
  },
});

export const { FILTER_BY_SEARCH } = filterSlice.actions;
export const selectFilteredRooms = (state) => state.filter.filteredRooms;
export default filterSlice.reducer;
