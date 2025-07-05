import type React from "react"
import { Edit, Trash2, User, Tag, Hash, Copy } from 'lucide-react'
import type { BookCardProps } from "../../interface/interface"



const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900 leading-tight flex-1">{book.title}</h2>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${book.available
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}>
            {book.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <User className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium text-gray-700">Author:</span>
          <span className="text-gray-900">{book.author}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Tag className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium text-gray-700">Genre:</span>
          <span className="text-gray-900">{book.genre}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Hash className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium text-gray-700">ISBN:</span>
          <span className="font-mono text-xs text-gray-900 bg-gray-50 px-2 py-1 rounded">{book.isbn}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Copy className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium text-gray-700">Copies:</span>
          <span className="font-bold  bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs min-w-[24px] text-center">
            {book.copies}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          onClick={() => onEdit?.(book)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete?.(book.isbn)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  )
}

export default BookCard
