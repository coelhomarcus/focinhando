import { FiFilter } from "react-icons/fi";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4 justify-center">
        <FiFilter className="text-blue-600 text-xl" />
        <h3 className="text-lg font-semibold text-gray-900">
          Filtrar por Categoria
        </h3>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center">
        <button
          onClick={() => onSelectCategory("all")}
          className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md"
          }`}
        >
          Todas
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
