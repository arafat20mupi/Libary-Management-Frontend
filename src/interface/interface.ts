export interface Book {
  id?: string
  title: string
  author: string
  genre: string
  isbn: string
  copies: number
  available: boolean
  createdAt?: string
  updatedAt?: string
}

export interface BorrowRequest {
  isbn: string
  borrowerInfo: {
    name: string
    email: string
    dueDate: string
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export interface BooksState {
  books: Book[]
  selectedBook: Book | null
  searchQuery: string
  filters: {
    genre: string
    availability: "all" | "available" | "unavailable"
    author: string
  }
}


export interface BookCardProps {
  book: Book
  onEdit?: (book: Book) => void
  onDelete?: (isbn: string) => void
}