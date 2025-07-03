import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import booksSlice from "./slices/booksSlice"
import uiSlice from "./slices/uiSlice"
import { booksApi } from "./API/bookApi"

export const store = configureStore({
  reducer: {
    books: booksSlice,
    ui: uiSlice,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(booksApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
