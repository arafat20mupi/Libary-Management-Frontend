import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import booksSlice from "./slices/booksSlice"

export const store = configureStore({
  reducer: {
    books: booksSlice,
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
