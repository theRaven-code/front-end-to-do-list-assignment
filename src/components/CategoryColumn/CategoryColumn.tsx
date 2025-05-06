import { ColumnItem } from "../../types/TodoTypes";
import CategoryItem from "./CategoryItem";

interface CategoryColumnProps {
  title: string;
  items: ColumnItem[];
  timeLeft: Record<string, number>;
  getProgress: (id: string) => number;
  onItemReturn: (item: ColumnItem) => void;
  category: "fruit" | "vegetable";
}

const CategoryColumn = ({
  title,
  items,
  timeLeft,
  getProgress,
  onItemReturn,
  category,
}: CategoryColumnProps) => {
  return (
    <div
      className={`
        flex-1 rounded-xl p-4 min-h-[400px] relative overflow-hidden
        ${
          category === "fruit" ? "bg-pink-100" : "bg-green-100"
        } border border-gray-300 shadow-sm
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="relative z-10">
        <div
          className={`
            ${
              category === "fruit" ? "bg-pink-500" : "bg-green-600"
            } text-white font-bold py-2 px-4 rounded-lg shadow-md inline-block mb-4
          `}
        >
          <h2 className="text-xl">{title}</h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CategoryItem
              key={item.id}
              item={item}
              timeLeft={timeLeft[item.id] || 0}
              progress={getProgress(item.id)}
              onReturn={onItemReturn}
              category={category}
            />
          ))}
          {items.length === 0 && (
            <div
              className="
              text-center py-12 rounded-lg
              text-black italic
              bg-white
              border border-gray-200
            "
            >
              No {title.toLowerCase()} yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryColumn;
