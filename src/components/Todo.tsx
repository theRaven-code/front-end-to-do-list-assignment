"use client";
import { useState, useCallback, memo } from "react";
import { TodoItem, ColumnItem } from "../types/TodoTypes";
import { initialTodoList } from "../data/initialData";
import TodoList from "./TodoList/TodoList";
import CategoryColumn from "./CategoryColumn/CategoryColumn";
import useTimerManagement from "../hooks/useTimerManagement";

// Memoize the TodoList component to prevent unnecessary re-renders
const MemoizedTodoList = memo(TodoList);
const MemoizedCategoryColumn = memo(CategoryColumn);

export default function Todo() {
  const [todoList, setTodoList] = useState<TodoItem[]>(initialTodoList);
  const [fruitColumn, setFruitColumn] = useState<ColumnItem[]>([]);
  const [vegetableColumn, setVegetableColumn] = useState<ColumnItem[]>([]);

  // Move item back to main list
  let clearTimerRef: ((id: string) => void) | null = null;
  const moveBackToMainList = useCallback((columnItem: ColumnItem) => {
    setFruitColumn((prev) => prev.filter((i) => i.id !== columnItem.id));
    setVegetableColumn((prev) => prev.filter((i) => i.id !== columnItem.id));
    setTodoList((prev) => [
      ...prev.filter((i) => i.id !== columnItem.id),
      { id: columnItem.id, type: columnItem.type, name: columnItem.name },
    ]);
    if (clearTimerRef) clearTimerRef(columnItem.id);
  }, []);

  // Get timer management functions from custom hook
  const { timeLeft, clearTimer, startTimer, getTimerProgress } =
    useTimerManagement({
      fruitColumn,
      vegetableColumn,
      onMoveBack: moveBackToMainList,
    });
  clearTimerRef = clearTimer;

  // Move item from todo list to its category column
  const moveToTypeColumn = useCallback(
    (item: TodoItem) => {
      setTodoList((prev) => prev.filter((i) => i.id !== item.id));
      const columnItem: ColumnItem = { ...item };
      if (item.type === "Fruit") {
        setFruitColumn((prev) => [...prev, columnItem]);
      } else {
        setVegetableColumn((prev) => [...prev, columnItem]);
      }
      startTimer(columnItem, item);
    },
    [startTimer]
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto rounded-lg bg-white border border-gray-200 shadow-sm p-2 sm:p-4 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4 sm:mb-8">
          Todo List
        </h1>

        <p className="text-center w-full mb-4 sm:mb-8 text-black max-w-2xl mx-auto text-sm sm:text-base">
          Click on an item to move it to its category column. It will
          automatically return after 5 seconds.
        </p>

        <div className="flex flex-col lg:flex-row flex-wrap gap-4 sm:gap-6 w-full">
          {/* Main list */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <MemoizedTodoList items={todoList} onMoveItem={moveToTypeColumn} />
          </div>

          {/* Type columns */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1 w-full lg:w-1/2">
            {/* Fruit column */}
            <MemoizedCategoryColumn
              title="Fruits"
              items={fruitColumn}
              timeLeft={timeLeft}
              getProgress={getTimerProgress}
              onItemReturn={moveBackToMainList}
              category="fruit"
            />

            {/* Vegetable column */}
            <MemoizedCategoryColumn
              title="Vegetables"
              items={vegetableColumn}
              timeLeft={timeLeft}
              getProgress={getTimerProgress}
              onItemReturn={moveBackToMainList}
              category="vegetable"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
