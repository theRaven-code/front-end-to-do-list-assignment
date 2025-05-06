import { TodoItem } from "../../types/TodoTypes";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  items: TodoItem[];
  onMoveItem: (item: TodoItem, index: number) => void;
}

const TodoList = ({ items, onMoveItem }: TodoListProps) => (
  <div className="flex-1 rounded-xl p-4 bg-gradient-to-br from-blueberry-light to-white/50 backdrop-blur-md min-h-[400px] border-2 border-white/60 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-blueberry-medium opacity-50"></div>
    <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-blueberry-medium opacity-50"></div>

    <div className="relative z-10">
      <div className="bg-blueberry-dark/80 text-white font-bold py-2 px-4 rounded-lg shadow-md inline-block mb-4 transform -rotate-2">
        <h2 className="text-xl text-black">Todo List</h2>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <TodoListItem
            key={`${item.type}-${item.name}-${index}`}
            item={item}
            index={index}
            onMove={onMoveItem}
          />
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 rounded-lg text-blueberry-dark italic bg-white/40 backdrop-blur-sm border border-white/40 animate-pulse-slow">
            No items in the list
          </div>
        )}
      </div>
    </div>
  </div>
);

export default TodoList;
