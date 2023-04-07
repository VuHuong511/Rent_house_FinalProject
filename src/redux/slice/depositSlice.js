import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billingAddress: {},
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    SAVE_BILLING_ADDRESS(state, action) {
      console.log(action.payload);
      state.billingAddress = action.payload;
    },
  },
});

export const { SAVE_BILLING_ADDRESS } = depositSlice.actions;
export const selectBillingAddress = (state) => state.deposit.billingAddress;
export default depositSlice.reducer;
