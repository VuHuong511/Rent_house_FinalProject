import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      const roomIndex = state.wishItems.findIndex(
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
        state.wishItems.push(tempRooms);
        toast.success(`${action.payload.name}Room added to wish list`, {
          position: "top-left",
        });
      }
      // save wish list to LS
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
    },
  },
});

export const { ADD_TO_WISHLIST } = wishListSlice.actions;
export const selectWishItems = (state) => state.wishList.wishItems;
export default wishListSlice.reducer;
