import ProgressiveImage from "./ProgressiveImage";

interface Props {
  book: any;
  onClick: () => void;
  index: number;
  currentIndex: number;
  onLoadNext: () => void;
}

export default function BookCard({ book, onClick, index, currentIndex, onLoadNext }: Props) {
  const coverUrl =
    book.cover_i || book.cover_id || book.work?.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_i || book.cover_id || book.work?.cover_id}-M.jpg`
      : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg shadow hover:shadow-lg transition"
    >
      <ProgressiveImage
        src={coverUrl}
        alt={book.title || book.work?.title}
        index={index}
        currentIndex={currentIndex}
        onLoadNext={onLoadNext}
      />
      <h3 className="mt-2 font-medium text-lg pl-2">
        {book.title || book.work?.title}
      </h3>
      <p className="text-sm text-green-600 pl-2">
        {book.author_names?.[0] ||
          book.author_name?.[0] ||
          book.work?.author_names?.[0] ||
          "Unknown"}
      </p>
      <p className="text-rose-500 font-medium text-[15px] pl-2">
        {book.first_publish_year || book.work?.first_publish_year || "N/A"}
      </p>
    </div>
  );
}
