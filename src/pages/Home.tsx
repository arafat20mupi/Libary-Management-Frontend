import BookCard from "../components/Book/BookCard";
import CoverPage from "../components/Home/CoverPage";

const Home = () => {
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
    return (
        <>
            <CoverPage />
            {sampleBooks.map((book) => (
                <BookCard key={book.isbn} book={book} />
            ))
            }
        </>
    );
};

export default Home;