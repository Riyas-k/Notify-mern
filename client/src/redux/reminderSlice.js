import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configure the Redux Persist options
const persistConfig = {
  key: "root", // Key for the storage
  storage, // Storage method (local storage, AsyncStorage, etc.)
};

const initialState = {
  loading: false,
};

const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reminderSlice.reducer);

export const { setLoading } = reminderSlice.actions;
export default persistedReducer;
