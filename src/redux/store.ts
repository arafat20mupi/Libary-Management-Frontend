import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice"; // optional
import { setupListeners } from "@reduxjs/toolkit/query";
import { booksApi } from "./api/booksApi";

export const store = configureStore({
  reducer: {
    books: booksSlice,
    [booksApi.reducerPath]: booksApi.reducer, // ✅ Add the API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware), // ✅ Add the middleware here
});

// Optional but recommended for refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
