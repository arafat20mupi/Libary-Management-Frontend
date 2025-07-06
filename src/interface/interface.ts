export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowedBookItem {
  book: {
    title: string
    author?: string
    isbn?: string
  }
  totalQuantity: number
}

export interface GetAllBooksResponse {
  success: boolean;
  message: string;
  data: Book[];
}


export interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (isbn: string) => void;
  onBorrow?: (bookId: string, copies: number) => void;
}

