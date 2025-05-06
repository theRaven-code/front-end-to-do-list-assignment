import { ColumnItem } from "../../types/TodoTypes";
import TimerBar from "../ui/TimerBar";

interface CategoryItemProps {
  item: ColumnItem;
  timeLeft: number;
  progress: number;
  onReturn: (item: ColumnItem) => void;
  category: "fruit" | "vegetable";
}

const CategoryItem = ({
  item,
  timeLeft,
  progress,
  onReturn,
  category,
}: CategoryItemProps) => {
  // Determine emoji based on item name
  const getEmoji = () => {
    const fruitEmojis: Record<string, string> = {
      Apple: "🍎",
      Banana: "🍌",
      Orange: "🍊",
      Mango: "🥭",
      Pineapple: "🍍",
      Watermelon: "🍉",
    };

    const vegetableEmojis: Record<string, string> = {
      Broccoli: "🥦",
      Mushroom: "🍄",
      Tomato: "🍅",
      Cucumber: "🥒",
      Carrot: "🥕",
    };

    if (category === "fruit" && fruitEmojis[item.name]) {
      return fruitEmojis[item.name];
    } else if (category === "vegetable" && vegetableEmojis[item.name]) {
      return vegetableEmojis[item.name];
    }

    return category === "fruit" ? "🍓" : "🥗";
  };

  return (
    <div className="relative animate-slideIn group">
      <button
        onClick={() => onReturn(item)}
        className="
          p-3 bg-white w-full text-left 
          flex justify-between items-center transition-all transform 
          hover:scale-[1.02] rounded-md shadow-md
          border border-gray-300
          hover:bg-gray-50 hover:shadow-lg
        "
      >
        <span className="font-medium text-gray-800 flex items-center">
          <span className="mr-2 text-xl">{getEmoji()}</span>
          {item.name}
        </span>
      </button>
      <TimerBar
        progress={progress}
        color={category === "fruit" ? "pink" : "green"}
        isActive={timeLeft > 0}
      />
    </div>
  );
};

export default CategoryItem;
