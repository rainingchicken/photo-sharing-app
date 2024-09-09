import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPatj]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
