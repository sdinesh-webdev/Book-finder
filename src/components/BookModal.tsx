interface Props {
    book: any;
    onClose: () => void;
  }
  
  export default function BookModal({ book, onClose }: Props) {
    if (!book) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700 mb-2">
            Author: {book.author_name?.join(", ") || "Unknown"}
          </p>
          <p className="text-gray-600 mb-2">
            First Published: {book.first_publish_year || "N/A"}
          </p>
          <p className="text-gray-600">
            Publishers: {book.publisher?.slice(0, 3).join(", ") || "N/A"}
          </p>
        </div>
      </div>
    );
  }
  