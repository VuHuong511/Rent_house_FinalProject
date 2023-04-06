import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishItems: localStorage.getItem("wishItems")
    ? JSON.parse(localStorage.getItem("wishItems"))
    : [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    ADD_TO_WISHLIST(state, action) {
      console.log(action.payload);
    },
  },
});

export const { ADD_TO_WISHLIST } = wishListSlice.actions;
export const selectWishItems = (state) => state.wishList.wishItems;
export default wishListSlice.reducer;
