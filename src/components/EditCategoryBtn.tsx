import { useEffect, useState } from "react";
import { Category } from "../utils/definitions";

const EditCategoryBtn = ({ 
  cat,
  selectedCategory,
  handleSelected 
}: { 
  cat: Category,
  selectedCategory: Category[],
  handleSelected: (category: Category) => void 
}) => {

  const [activeCategory, setActiveCategory] = useState<boolean>(false);
  useEffect(() => {
    const isSelected = selectedCategory.some(
      (item) => item.category === cat.category
    );
    setActiveCategory(isSelected);
  }, [selectedCategory, cat.category]);

  return (
    <li
      onClick={() => {
        handleSelected({
          id: cat.id,
          category: cat.category,
          emoji: cat.emoji,
        });
      }}
      className={`text-base max-sm:text-sm cursor-pointer flex items-center gap-2 font-medium text-white rounded-lg px-4 py-2 max-sm:py-1 ${
        activeCategory
          ? "bg-indigo-600 border-indigo-300 border-2"
          : "bg-indigo-400"
      } `}
    >
      <span className=" text-2xl max-sm:text-lg">{cat.emoji}</span>
      {cat.category}
    </li>
  );
};

export default EditCategoryBtn;
