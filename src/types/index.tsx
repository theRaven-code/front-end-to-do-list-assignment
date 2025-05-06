// Types
export interface TodoItem {
  type: "Fruit" | "Vegetable";
  name: string;
}

export interface ColumnItem extends TodoItem {
  id: string;
}

export interface TimerState {
  [key: string]: {
    timeout: NodeJS.Timeout;
    startTime: number;
  };
}

// Components
export type TodoItemProps = {
  item: TodoItem;
  index: number;
  onMove: (item: TodoItem, index: number) => void;
};
