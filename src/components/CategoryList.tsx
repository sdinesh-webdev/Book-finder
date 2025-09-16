interface Category {
    name: string;
    image: string;
  }
  
  interface Props {
    onSelect: (category: string) => void;
  }
  
  const categories: Category[] = [
    { name: "Fiction", image: "./space.png" },
    { name: "Fantasy", image: "./magic-book.png" },
    { name: "Romance", image: "https://img.icons8.com/color/96/heart-with-arrow.png" },
    { name: "Mystery", image: "./magic-ball.png" },
    { name: "Science", image: "./potion.png" },
    { name: "History", image: "./scroll.png" },
    { name: "Biography", image: "./bio.png" },
    { name: "Children", image: "./tree.png" },
    { name: "Horror", image: "./horror.png" },
    { name: "Poetry", image: "./poetry.png" },
  ];
  
  export default function CategoryList({ onSelect }: Props) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-10 gap-6 mt-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-14 h-14 object-contain"
            />
            <span className="mt-2 text-sm font-medium">{cat.name}</span>
          </div>
        ))}
      </div>
    );
  }
  