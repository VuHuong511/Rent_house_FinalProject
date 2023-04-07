import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import roomReducer from "./slice/roomSlice";
import filterReducer from "./slice/filterSlice";
import wishListReducer from "./slice/wishListSlice";
import depositReducer from "./slice/depositSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  filter: filterReducer,
  wishList: wishListReducer,
  deposit: depositReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
