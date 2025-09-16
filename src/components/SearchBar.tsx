import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 w-full  mx-auto items-start">
      <input
        type="text"
        placeholder="Search books by title..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border-2 rounded-full px-4 py-4 focus:ring-2 font-bold focus:ring-blue-500 outline-none"
      />
     
          
          <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-sky-500 via-emerald-500 via-amber-400 via-orange-500 to-rose-500 text-white  text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 ease-in-out">
                search
            </button>
    </form>
  );
}
