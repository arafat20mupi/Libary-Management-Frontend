import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import App from "../App";
import AddBook from "../pages/AddBook";
import BorrowSummary from "../pages/BorrowSummary";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route  path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="all-books" element={<AllBooks />} />
          <Route path="create-book" element={<AddBook />} />
          <Route path="borrow-summary" element={<BorrowSummary />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
