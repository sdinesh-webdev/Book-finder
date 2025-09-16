import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const coverId = searchParams.get("cover") || "";

  const [book, setBook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!book) return <p className="text-center mt-6">Book not found</p>;

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/300x400?text=No+Cover";

  // 🔹 Read Aloud function
  const handleReadAloud = async () => {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const text =
      book.description?.value ||
      book.description ||
      "No description available";

    try {
      setPlaying(true);
      const res = await fetch("http://localhost:5000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("TTS request failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.onended = () => setPlaying(false);
      audio.play();
    } catch (err) {
      console.error("TTS error", err);
      setPlaying(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="text-gray-700 text-2xl hover:underline flex justify-start items-center"
      >
        <img src="../left-arrow.png" alt="back" className="h-8 pr-3" />
        Back to search
      </Link>

      {/* Layout: Cover + Info */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Fixed Image */}
        <img
          src={coverUrl}
          alt={book.title}
          className="w-auto h-96 rounded shadow flex-shrink-0"
        />

        {/* Book Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>

          {/* Description — scrollable */}
          <div className="text-gray-700 mb-6 max-h-[800px] overflow-y-auto pr-3 leading-relaxed">
            {book.description?.value ||
              book.description ||
              "No description available"}
          </div>

      

          {/* First Published */}
          {book.first_publish_date && (
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">First published:</span>{" "}
              {book.first_publish_date}
            </p>
          )}

          {/* Subjects */}
          {book.subjects && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Subjects</h3>
              <p className="text-sm text-gray-700">
                {book.subjects.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
