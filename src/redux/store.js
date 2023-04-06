import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import roomReducer from "./slice/roomSlice";
import filterReducer from "./slice/filterSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  filter: filterReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
