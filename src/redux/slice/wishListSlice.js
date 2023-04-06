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
    REMOVE_FROM_WISHLIST(state, action) {
      const newWishItem = state.wishListItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.wishListItems = newWishItem;
      toast.success(`${action.payload.name} removed from wish list`, {
        position: "top-left",
      });
      localStorage.setItem(
        "wishListItems",
        JSON.stringify(state.wishListItems)
      );
    },
    CLEAR_WISH_LIST(state, action) {
      state.wishListItems = [];
      toast.info(`Clear wish list`, {
        position: "top-left",
      });
      localStorage.setItem(
        "wishListItems",
        JSON.stringify(state.wishListItems)
      );
    },
  },
});
export const selectWishItems = (state) => state.wishList.wishListItems;

export const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISH_LIST } =
  wishListSlice.actions;
export default wishListSlice.reducer;
