import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, BorrowedBookItem, GetAllBooksResponse } from "../../interface/interface";

const API_BASE_URL = "https://libary-management-nu.vercel.app/api";

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["Book", "BorrowRecord"],
    endpoints: (builder) => ({
        // Get all books
        getAllBooks: builder.query<GetAllBooksResponse, { filter?: string; sort?: string; limit?: number }>({
            query: ({ filter, sort, limit }) => {
                const params = new URLSearchParams();
                if (filter) params.append("filter", filter);
                if (sort) params.append("sort", sort);
                if (limit) params.append("limit", limit.toString());
                return `/books?${params.toString()}`;
            },
            providesTags: ["Book"],
        }),

        // Get single book by ID
        getBookById: builder.query<{ data: Book }, string>({
            query: (id) => `/books/${id}`,
        }),
        // Create a new book
        createBook: builder.mutation<Book, Partial<Book>>({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData,
            }),
            invalidatesTags: ["Book"],
        }),

        // Update book
        updateBook: builder.mutation<Book, { bookId: string; data: Partial<Book> }>({
            query: ({ bookId, data }) => ({
                url: `/books/${bookId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_result, _error, { bookId }) => [{ type: "Book", id: bookId }],
        }),

        // Delete book
        deleteBook: builder.mutation<void, string>({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),

        // Borrow a book
        borrowBook: builder.mutation({
            query: (borrowData) => ({
                url: `/borrow`,
                method: 'POST',
                body: borrowData,
            }),
        }),

        // Get borrowed book summary
        getBorrowedBooks: builder.query<BorrowedBookItem[], void>({
            query: () => "/borrow",
            transformResponse: (response: { data: BorrowedBookItem[] }) => response.data,
        }),



    }),
});

export const {
    useGetAllBooksQuery,
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useBorrowBookMutation,
    useGetBorrowedBooksQuery,
} = booksApi;
