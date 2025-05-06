import { useState, useEffect, useRef, useCallback } from "react";
import { ColumnItem, TimerState, TodoItem } from "../types/TodoTypes";

interface UseTimerManagementProps {
  fruitColumn: ColumnItem[];
  vegetableColumn: ColumnItem[];
  onMoveBack: (columnItem: ColumnItem, originalItem?: TodoItem) => void;
}

interface UseTimerManagementReturn {
  timers: TimerState;
  timeLeft: Record<string, number>;
  pendingItemsRef: React.RefObject<Set<string>>;
  clearTimer: (itemId: string) => void;
  startTimer: (columnItem: ColumnItem, originalItem: TodoItem) => void;
  getTimerProgress: (key: string) => number;
}

export default function useTimerManagement({
  fruitColumn,
  vegetableColumn,
  onMoveBack,
}: UseTimerManagementProps): UseTimerManagementReturn {
  const [timers, setTimers] = useState<TimerState>({});
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  const pendingItemsRef = useRef<Set<string>>(new Set());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear a specific timer
  const clearTimer = useCallback(
    (itemId: string) => {
      if (timers[itemId]) {
        clearTimeout(timers[itemId].timeout);

        setTimers((prev) => {
          const newTimers = { ...prev };
          delete newTimers[itemId];
          return newTimers;
        });

        pendingItemsRef.current.delete(itemId);
      }
    },
    [timers]
  );

  // Start a timer for an item
  const startTimer = useCallback(
    (columnItem: ColumnItem, originalItem: TodoItem) => {
      const itemId = columnItem.id;
      pendingItemsRef.current.add(itemId);

      // Set timer to move back after 5 seconds
      const timeout = setTimeout(() => {
        if (pendingItemsRef.current.has(itemId)) {
          onMoveBack(columnItem, originalItem);
        }
      }, 5000);

      // Store timer reference with start time
      setTimers((prev) => ({
        ...prev,
        [itemId]: {
          timeout,
          startTime: Date.now(),
        },
      }));
    },
    [onMoveBack]
  );

  // Update countdown timers and handle edge cases
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const newTimeLeft: Record<string, number> = {};
      let hasItemsToProcess = false;

      // Process each active timer
      Object.entries(timers).forEach(([key, { startTime }]) => {
        // Calculate remaining time
        const elapsed = now - startTime;
        const remaining = Math.max(0, 5000 - elapsed);
        newTimeLeft[key] = Math.ceil(remaining / 1000);
        hasItemsToProcess = true;

        // Safety check: If timer hit zero but item is still in a column, move it back
        if (remaining <= 0 && pendingItemsRef.current.has(key)) {
          // Find the item in one of the columns
          const fruitItem = fruitColumn.find((item) => item.id === key);
          const vegItem = vegetableColumn.find((item) => item.id === key);
          const item = fruitItem || vegItem;

          if (item) {
            // Handle on next tick to avoid state updates during render
            setTimeout(() => {
              onMoveBack(item);
            }, 0);
          }

          pendingItemsRef.current.delete(key);
        }
      });

      // Only update state if there are active timers
      if (hasItemsToProcess) {
        setTimeLeft(newTimeLeft);
      }
    }, 100);

    // Clean up interval on unmount or when dependencies change
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timers, fruitColumn, vegetableColumn, onMoveBack]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timers).forEach((timer) => clearTimeout(timer.timeout));

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timers]);

  // Calculate progress percentage for timer bar
  const getTimerProgress = useCallback(
    (key: string): number => {
      if (!timers[key]) return 0;
      return ((timeLeft[key] || 0) / 5) * 100;
    },
    [timers, timeLeft]
  );

  return {
    timers,
    timeLeft,
    pendingItemsRef,
    clearTimer,
    startTimer,
    getTimerProgress,
  };
}
