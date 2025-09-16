import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BookDetails from "./Pages/BookDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  );
}
