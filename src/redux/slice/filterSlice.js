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
        const tempRooms = rooms.filter(
          (room) =>
            room.name.toLowerCase().includes(search.toLowerCase()) ||
            room.address.toLowerCase().includes(search.toLowerCase()) ||
            room.type.toLowerCase().includes(search.toLowerCase())
        );
        state.filteredRooms = tempRooms;
      }
    },
    SORT_ROOMS(state, action) {
      const { rooms, sort } = action.payload;
      let tempRooms = [];
      if (sort === "latest") {
        tempRooms = rooms;
      }
      if (sort === "lowest-price") {
        tempRooms = rooms.slice().sort((a, b) => {
          return a.regularPrice - b.regularPrice;
        });
      }
      if (sort === "highest-price") {
        tempRooms = rooms.slice().sort((a, b) => {
          return b.regularPrice - a.regularPrice;
        });
      }
      if (sort === "a-z") {
        tempRooms = rooms.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempRooms = rooms.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filteredRooms = tempRooms;
    },
    FILTER_BY_TYPE(state, action) {
      const { rooms, type } = action.payload;
      let tempRooms = [];
      if (type === "All") {
        tempRooms = rooms;
      } else {
        tempRooms = rooms.filter((room) => room.type === type);
      }
      state.filteredRooms = tempRooms;
    },

    FILTER_BY_LOCATION(state, action) {
      const { rooms, location } = action.payload;
      let tempRooms = [];
      if (location === "All") {
        tempRooms = rooms;
      } else {
        tempRooms = rooms.filter((room) => room.address === location);
      }
      state.filteredRooms = tempRooms;
    },
    FILTER_BY_PRICE(state, action) {
      const { rooms, price } = action.payload;
      let tempRooms = [];
      tempRooms = rooms.filter((room) => room.regularPrice <= price);

      state.filteredRooms = tempRooms;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_ROOMS,
  FILTER_BY_TYPE,
  FILTER_BY_LOCATION,
  FILTER_BY_PRICE,
} = filterSlice.actions;
export const selectFilteredRooms = (state) => state.filter.filteredRooms;
export default filterSlice.reducer;
