import BookCard from "../components/Book/BookCard";
import type { Book } from "../interface/interface";



const sampleBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic Literature",
        isbn: "978-0-7432-7356-5",
        copies: 5,
        available: true,
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        isbn: "978-0-06-112008-4",
        copies: 2,
        available: false,
    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        isbn: "978-0-452-28423-4",
        copies: 8,
        available: true,
    },
]

const AllBooks = () => {
    const handleEdit = (book: Book) => {
        console.log("Edit book:", book)
    }

  const handleDelete = (isbn: string) => {
    console.log("Delete book with ISBN:", isbn)
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBooks.map((book) => (
            <BookCard key={book.isbn} book={book} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default AllBooks;