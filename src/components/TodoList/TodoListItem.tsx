import { TodoItem } from "../../types/TodoTypes";

interface TodoListItemProps {
  item: TodoItem;
  index: number;
  onMove: (item: TodoItem, index: number) => void;
}

const TodoListItem = ({ item, index, onMove }: TodoListItemProps) => {
  const category = item.type === "Fruit" ? "fruit" : "vegetable";

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
    <button
      onClick={() => onMove(item, index)}
      className="
        p-3 bg-gray-100 border border-gray-300 
        rounded-md shadow-sm hover:bg-gray-200 transition-all 
        transform hover:scale-[1.02] text-left flex justify-between 
        items-center animate-fadeIn
        hover:shadow-xl group
      "
    >
      <span className="font-medium text-gray-800 flex items-center">
        <span className="mr-2 text-xl group-hover:animate-bounce-small">
          {getEmoji()}
        </span>
        {item.name}
      </span>
      <span
        className={`
          px-3 py-1.5 rounded-full text-xs font-bold
          text-white
          ${category === "fruit" ? "bg-pink-500" : "bg-green-600"}
          group-hover:scale-110 transition-transform
        `}
      >
        {item.type}
      </span>
    </button>
  );
};

export default TodoListItem;
