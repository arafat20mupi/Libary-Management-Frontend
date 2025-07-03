/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ApiResponse, Book, BorrowRequest } from "../../interface/interface"



// Configure your backend API base URL
const API_BASE_URL = "http://localhost:8000/api"

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add authentication token if available
      const token = localStorage.getItem("authToken")
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      headers.set("content-type", "application/json")
      return headers
    },
  }),
  tagTypes: ["Book", "BorrowRecord"],
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      transformResponse: (response: ApiResponse<Book[]>) => response.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Book" as const, id })), { type: "Book", id: "LIST" }]
          : [{ type: "Book", id: "LIST" }],
    }),

    // Get single book by ID
    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: ApiResponse<Book>) => response.data,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),

    // Add new book
    addBook: builder.mutation<Book, Omit<Book, "id" | "createdAt" | "updatedAt">>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      transformResponse: (response: ApiResponse<Book>) => response.data,
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),

    // Update existing book
    updateBook: builder.mutation<Book, Book>({
      query: ({ id, ...book }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: book,
      }),
      transformResponse: (response: ApiResponse<Book>) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

    // Delete book
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<{ success: boolean }>) => response.data,
      invalidatesTags: (result, error, id) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

    // Borrow book
    borrowBook: builder.mutation<{ success: boolean; borrowId: string }, BorrowRequest>({
      query: ({ isbn, borrowerInfo }) => ({
        url: `/books/${isbn}/borrow`,
        method: "POST",
        body: borrowerInfo,
      }),
      transformResponse: (response: ApiResponse<{ success: boolean; borrowId: string }>) => response.data,
      invalidatesTags: [{ type: "Book", id: "LIST" }, "BorrowRecord"],
    }),

    // Return book
    returnBook: builder.mutation<{ success: boolean }, { isbn: string; borrowId: string }>({
      query: ({ isbn, borrowId }) => ({
        url: `/books/${isbn}/return`,
        method: "POST",
        body: { borrowId },
      }),
      transformResponse: (response: ApiResponse<{ success: boolean }>) => response.data,
      invalidatesTags: [{ type: "Book", id: "LIST" }, "BorrowRecord"],
    }),

    // Get borrowing history
    // getBorrowHistory: builder.query<any[], string>({
    //   query: (isbn) => `/books/${isbn}/borrow-history`,
    //   transformResponse: (response: ApiResponse<any[]>) => response.data,
    //   providesTags: ["BorrowRecord"],
    // }),

    // Search books
    searchBooks: builder.query<Book[], { query: string; filters?: Record<string, any> }>({
      query: ({ query, filters = {} }) => {
        const params = new URLSearchParams({
          q: query,
          ...filters,
        })
        return `/books/search?${params}`
      },
      transformResponse: (response: ApiResponse<Book[]>) => response.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Book" as const, id })), { type: "Book", id: "SEARCH" }]
          : [{ type: "Book", id: "SEARCH" }],
    }),
  }),
})

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useReturnBookMutation,
//   useGetBorrowHistoryQuery,
  useSearchBooksQuery,
} = booksApi
