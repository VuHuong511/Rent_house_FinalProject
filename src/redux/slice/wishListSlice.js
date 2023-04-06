import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishListItems: localStorage.getItem("wishItems")
    ? JSON.parse(localStorage.getItem("wishItems"))
    : [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    ADD_TO_WISHLIST(state, action) {
      console.log(action.payload);
      const roomIndex = state.wishListItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (roomIndex >= 0) {
        // item already exists in the wish list
        toast.error("This room already added to wish list", {
          position: "top-left",
        });
      } else {
        // item does not already exists in the wish list
        // add item to the cart
        const tempRooms = { ...action.payload };
        state.wishListItems.push(tempRooms);
        toast.success(`${action.payload.name}Room added to wish list`, {
          position: "top-left",
        });
      }
      // save wish list to LS
      localStorage.setItem(
        "wishListItems",
        JSON.stringify(state.wishListItems)
      );
    },
  },
});
export const selectWishItems = (state) => state.wishList.wishListItems;

export const { ADD_TO_WISHLIST } = wishListSlice.actions;
export default wishListSlice.reducer;
