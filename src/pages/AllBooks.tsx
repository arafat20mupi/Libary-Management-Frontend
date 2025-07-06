import { useState } from "react"
import toast from "react-hot-toast"
import BookCard from "../components/Book/BookCard"
import type { Book } from "../interface/interface"
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
} from "../redux/api/booksApi"

const AllBooks = () => {
  const { data: booksResponse, isLoading, isError, refetch } = useGetAllBooksQuery({})
  const books = booksResponse?.data ?? []

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation()
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation()

  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [borrowingBook, setBorrowingBook] = useState<Book | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: false,
  })

  const [borrowData, setBorrowData] = useState({ quantity: 1, dueDate: "" })

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

  const closeEditModal = () => setEditingBook(null)

  const openBorrowModal = (book: Book) => {
    setBorrowingBook(book)
    setBorrowData({ quantity: 1, dueDate: "" })
  }

  const closeBorrowModal = () => setBorrowingBook(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleBorrowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBorrowData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value,
    }))
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBook) return
    try {
      await updateBook({ bookId: editingBook._id, data: formData }).unwrap()
      toast.success("Book updated successfully")
      closeEditModal()
      refetch()
    } catch {
      toast.error("Failed to update book")
    }
  }

  const handleBorrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!borrowingBook) return
    try {
      await borrowBook({ book: borrowingBook._id, ...borrowData }).unwrap()
      toast.success("Book borrowed successfully!")
      closeBorrowModal()
      refetch()
    } catch {
      toast.error("Failed to borrow book.")
    }
  }

  const handleDelete = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return
    try {
      await deleteBook(bookId).unwrap()
      toast.success("Book Deleted Successfully")
      refetch()
    } catch {
      toast.error("Failed to delete book.")
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

        {(isLoading || isDeleting || isUpdating || isBorrowing) && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {isError ? (
          <p className="text-center text-red-500">Failed to load books. Try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onEdit={() => openEditModal(book)}
                  onDelete={() => handleDelete(book._id)}
                  onBorrow={() => openBorrowModal(book)} // ✅ Borrow handler
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">No books found.</p>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {editingBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeEditModal}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
                <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" className="w-full border p-2 rounded" required />
                <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" className="w-full border p-2 rounded" />
                <input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" className="w-full border p-2 rounded" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
                <input name="copies" type="number" value={formData.copies} onChange={handleChange} placeholder="Copies" className="w-full border p-2 rounded" />
                <label>
                  <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} /> Available
                </label>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={closeEditModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Borrow Modal */}
        {borrowingBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeBorrowModal}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4">Borrow: {borrowingBook.title}</h2>
              <form onSubmit={handleBorrowSubmit} className="space-y-4">
                <input
                  name="quantity"
                  type="number"
                  min={1}
                  max={borrowingBook.copies}
                  value={borrowData.quantity}
                  onChange={handleBorrowChange}
                  placeholder="Quantity"
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  name="dueDate"
                  type="date"
                  value={borrowData.dueDate}
                  onChange={handleBorrowChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={closeBorrowModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Confirm Borrow</button>
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
