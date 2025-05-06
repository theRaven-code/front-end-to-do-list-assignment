export interface TodoItem {
  id: string;
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
