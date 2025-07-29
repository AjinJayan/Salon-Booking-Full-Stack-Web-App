import React from "react";
import { Category } from "../../Redux/reducers/categoryReducer";

export interface CategoryCardProps {
  handleCategoryClick(item: number): void;
  selectedCategory: number;
  category: Category;
}

export function CategoryCard({
  handleCategoryClick,
  selectedCategory,
  category,
}: CategoryCardProps) {
  return (
    <div
      onClick={() => handleCategoryClick(category.id!)}
      className={`px-3 py-2 cursor-pointer flex gap-2 items-center ${
        selectedCategory === category.id
          ? "bg-green-600 text-white rounded-md"
          : null
      }`}
    >
      <img
        className="w-14 h-14 object-cover rounded-full"
        src={category.image!}
        alt=""
      />
      <h1>{category.name}</h1>
    </div>
  );
}
