import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../../interface/interface";

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
    removeBook(state, action: PayloadAction<string>) {
      state.books = state.books.filter(book => book._id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setBooks, addBook, removeBook, setLoading, setError } = booksSlice.actions;
export default booksSlice.reducer;
