import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Book, BooksState } from "../../interface/interface"



const initialState: BooksState = {
  books: [],
  selectedBook: null,
  searchQuery: "",
  filters: {
    genre: "",
    availability: "all",
    author: "",
  },
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload
    },

    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload)
    },

    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex((book : Book) => book.id === action.payload.id)
      if (index !== -1) {
        // Apply business logic: if copies = 0, mark as unavailable
        const updatedBook = {
          ...action.payload,
          available: action.payload.copies > 0 ? action.payload.available : false,
        }
        state.books[index] = updatedBook
      }
    },

    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book : Book) => book.id !== action.payload)
    },

    borrowBook: (state, action: PayloadAction<string>) => {
      const book = state.books.find((book : Book) => book.id === action.payload)
      if (book && book.copies > 0) {
        book.copies -= 1
        book.available = book.copies > 0
      }
    },

    returnBook: (state, action: PayloadAction<string>) => {
      const book = state.books.find((book : Book) => book.id === action.payload)
      if (book) {
        book.copies += 1
        book.available = true
      }
    },

    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },

    setFilters: (state, action: PayloadAction<Partial<BooksState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    clearFilters: (state) => {
      state.filters = initialState.filters
      state.searchQuery = ""
    },
  },
})

export const {
  setBooks,
  addBook,
  updateBook,
  removeBook,
  borrowBook,
  returnBook,
  setSelectedBook,
  setSearchQuery,
  setFilters,
  clearFilters,
} = booksSlice.actions

export default booksSlice.reducer
