import { Link } from "react-router-dom"
import { BookOpen, Edit, Trash2, Eye, Calendar, User } from "lucide-react"
import type { Book } from "../../interface/interface"

interface BookCardProps {
  book: Book
  onEdit?: () => void
  onDelete?: () => void
  onBorrow?: () => void
  onViewDetails?: () => void
}

const BookCard = ({ book, onEdit, onDelete, onBorrow }: BookCardProps) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Book Cover */}
      <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
        <BookOpen className="h-16 w-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {book.available ? "Available" : "Not Available"}
          </div>
        </div>
      </div>

      {/* Book Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1 mr-2">{book.title}</h3>
            {book.genre && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(book.genre)}`}>
                {book.genre}
              </span>
            )}
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <User className="h-4 w-4 mr-1" />
            <span className="text-sm">{book.author}</span>
          </div>

          {book.isbn && (
            <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">ISBN: {book.isbn}</div>
          )}
        </div>

        {/* Description */}
        {book.description && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{book.description}</p>}

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{book.copies || 0} copies</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* View Details Button */}
          <Link
            to={`/book/${book._id}`}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group"
          >
            <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            View Details
          </Link>

          {/* Secondary Actions */}
          <div className="grid grid-cols-3 gap-2">
            {book.available && onBorrow && (
              <button
                onClick={onBorrow}
                className="flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
              >
                <BookOpen className="h-4 w-4" />
              </button>
            )}

            {onEdit && (
              <button
                onClick={onEdit}
                className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}

            {onDelete && (
              <button
                onClick={onDelete}
                className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
