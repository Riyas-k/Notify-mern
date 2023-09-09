import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from "./reminderSlice";

const store = configureStore({
  reducer:{
    reminder: reminderReducer,
  }
});

export default store;
