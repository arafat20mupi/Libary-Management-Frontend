import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import App from "../App";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
