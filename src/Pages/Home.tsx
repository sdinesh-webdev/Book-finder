import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import CategoryList from "../components/CategoryList";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextLoad = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  const fetchBooks = async (query: string, isCategory = false) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const url = isCategory
        ? `https://openlibrary.org/subjects/${encodeURIComponent(query.toLowerCase())}.json?limit=20`
        : `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;

      const res = await fetch(url);
      const data = await res.json();

      // subjects API returns "works", search API returns "docs"
      setBooks(data.works || data.docs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-row items-center justify-center align-middle mb-6 gap-2">
        <img src="./books.png" alt="logo"  className="w-30 h-30"/>
      <h1 className="text-6xl font-bold text-center mb-6 ">Book Finder</h1>
      </div>

      <SearchBar onSearch={(q) => fetchBooks(q)} />
      <CategoryList onSelect={(cat) => fetchBooks(cat, true)} />

      {loading && <p className="text-center mt-6">Searching...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-6 mt-6">
  {books.map((b, i) => (
    <BookCard
      key={b.key}
      book={b}
      index={i}
      currentIndex={currentIndex}
      onLoadNext={handleNextLoad}
      onClick={() =>
        navigate(
          `/book/${encodeURIComponent(b.key)}?cover=${
            b.cover_id || b.cover_i || ""
          }`
        )
      }
    />
  ))}
</div>


    </div>
  );
}
