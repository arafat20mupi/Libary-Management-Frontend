export interface Book {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  _id?: string; // Optional for the client-side representation
}

export interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (isbn: string) => void;
}