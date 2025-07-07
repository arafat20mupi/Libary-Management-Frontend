"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetBookByIdQuery, useBorrowBookMutation } from "../redux/api/booksApi"
import toast from "react-hot-toast"
import { ArrowLeft, Edit, Trash2, BookOpen, User, Hash, FileText, Copy, Check, Star, Heart } from "lucide-react"

const SingleBooks = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetBookByIdQuery(id || "")
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation()

  const [isFavorite, setIsFavorite] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const book = data?.data

  const handleBorrow = async () => {
    if (!id) return
    try {
      await borrowBook(id).unwrap()
      toast.success("Book borrowed successfully!")
    } catch (err) {
      toast.error("Failed to borrow book.")
      console.error(err)
    }
  }

  const handleEdit = () => {
    navigate(`/edit-book/${id}`)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      // Handle delete logic - you can add deleteBook mutation here
      console.log("Deleting book:", id)
      navigate("/all-books")
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const getGenreColor = (genre: string) => {
    const colors = {
      FICTION: "bg-blue-100 text-blue-800",
      SCIENCE: "bg-green-100 text-green-800",
      HISTORY: "bg-purple-100 text-purple-800",
      FANTASY: "bg-pink-100 text-pink-800",
      OTHER: "bg-gray-100 text-gray-800",
    }
    return colors[genre as keyof typeof colors] || colors.OTHER
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (isError || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Book Not Found</h3>
            <p className="text-red-600 mb-4">The requested book could not be found or failed to load.</p>
            <button
              onClick={() => navigate("/all-books")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to All Books
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-xl transition-colors ${
                isFavorite ? "bg-red-100 text-red-600" : "bg-white text-gray-600 hover:bg-gray-50"
              } shadow-sm border border-gray-200`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              {/* Book Cover */}
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No Cover Available</p>
                </div>
              </div>

              {/* Availability Status */}
              <div className="mb-6">
                <div
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                    book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${book.available ? "bg-green-500" : "bg-red-500"}`}></div>
                  {book.available ? "Available" : "Not Available"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBorrow}
                  disabled={!book.available || isBorrowing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isBorrowing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <BookOpen className="h-5 w-5 mr-2" />
                  )}
                  {isBorrowing ? "Borrowing..." : "Borrow Book"}
                </button>

                <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{book.copies || 0}</div>
                    <div className="text-sm text-gray-500">Total Copies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{book.author}</span>
                    </div>
                  </div>
                </div>
                {book.genre && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGenreColor(book.genre)}`}>
                    {book.genre}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {book.description || "No description available for this book."}
                </p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Book Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {book.isbn && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <Hash className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700">ISBN</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 font-mono text-sm">{book.isbn}</span>
                        <button
                          onClick={() => copyToClipboard(book.isbn, "isbn")}
                          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {copiedField === "isbn" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {book.genre && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700">Genre</span>
                      </div>
                      <span className="text-gray-900">{book.genre}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <Copy className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-700">Copies</span>
                    </div>
                    <span className="text-gray-900">{book.copies || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-700">Status</span>
                    </div>
                    <span className={`font-medium ${book.available ? "text-green-600" : "text-red-600"}`}>
                      {book.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Actions</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                  <FileText className="h-5 w-5" />
                  <span>View History</span>
                </button>

                <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                  <BookOpen className="h-5 w-5" />
                  <span>Reserve Book</span>
                </button>

                <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors">
                  <Star className="h-5 w-5" />
                  <span>Rate Book</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBooks
