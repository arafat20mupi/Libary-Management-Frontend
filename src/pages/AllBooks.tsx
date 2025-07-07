"use client"

import type React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import BookCard from "../components/Book/BookCard"
import type { Book } from "../interface/interface"
import { useGetAllBooksQuery, useDeleteBookMutation, useUpdateBookMutation } from "../redux/api/booksApi"

const AllBooks = () => {
  const { data: booksResponse, isLoading, isError, refetch } = useGetAllBooksQuery({})
  const books = booksResponse?.data ?? []
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation()
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()

  // State for edit modal and current book to edit
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  // Form state for all editable fields
  const [formData, setFormData] = useState<{
    title: string
    author: string
    genre: string
    isbn: string
    description: string
    copies: number
    available: boolean
  }>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: false,
  })

  // Open edit modal with selected book's data
  const openEditModal = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre || "",
      isbn: book.isbn || "",
      description: book.description || "",
      copies: book.copies || 0,
      available: book.available || false,
    })
  }

  // Close modal
  const closeEditModal = () => {
    setEditingBook(null)
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number.parseInt(value) || 0 : value,
    }))
  }

  // Handle form submit to update book
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBook) return

    try {
      await updateBook({ bookId: editingBook._id, data: formData }).unwrap()
      toast.success("Book updated successfully")
      closeEditModal()
      refetch()
    } catch (error) {
      toast.error("Failed to update book")
      console.error(error)
    }
  }

  // Delete handler
  const handleDelete = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return

    try {
      await deleteBook(bookId).unwrap()
      toast.success("Book Deleted Successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to delete book.")
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Library Book Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your library's book inventory with our modern book management system
          </p>
        </div>

        {(isLoading || isDeleting || isUpdating) && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600">Loading...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-medium">Failed to load books. Try again later.</p>
            </div>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.length > 0 ? (
              books.map((book: Book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onEdit={() => openEditModal(book)}
                  onDelete={() => handleDelete(book._id)}
                  onViewDetails={() => {}} // This will be handled in BookCard component
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
                  <p className="text-gray-600 text-lg">No books found.</p>
                  <p className="text-gray-500 text-sm mt-2">Add some books to get started!</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {editingBook && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeEditModal}
          >
            <div
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Book</h2>
                  <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleUpdateSubmit} className="p-6 space-y-6">
                {/* Title and Author Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="title">
                      Title *
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="author">
                      Author *
                    </label>
                    <input
                      id="author"
                      name="author"
                      type="text"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                {/* Genre and ISBN Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="genre">
                      Genre
                    </label>
                    <input
                      id="genre"
                      name="genre"
                      type="text"
                      value={formData.genre}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Fiction, Science, History"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="isbn">
                      ISBN
                    </label>
                    <input
                      id="isbn"
                      name="isbn"
                      type="text"
                      value={formData.isbn}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter ISBN number"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter book description..."
                  />
                </div>

                {/* Copies and Available Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="copies">
                      Total Copies *
                    </label>
                    <input
                      id="copies"
                      name="copies"
                      type="number"
                      min="0"
                      value={formData.copies}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="available">
                      Availability Status
                    </label>
                    <div className="flex items-center space-x-3 mt-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="available"
                          name="available"
                          type="checkbox"
                          checked={formData.available}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span className={`text-sm font-medium ${formData.available ? "text-green-600" : "text-red-600"}`}>
                        {formData.available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-blue-700">
                      Toggle the availability status to indicate if the book is currently available for borrowing.
                      Fields marked with * are required.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isUpdating && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    )}
                    {isUpdating ? "Updating..." : "Update Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllBooks
