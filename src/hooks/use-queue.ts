import {useEffect, useState} from "react";

interface UseQueueOptions {
  maxItems: number;
}
const defaultOptions: UseQueueOptions = {
  maxItems: Infinity,
};

export function useQueue<T>(
  initial: T[] = [] as T[],
  options: {
    maxItems?: number;
  } = defaultOptions,
) {
  const {maxItems: initialMaxItems, ...formattedOptions}: UseQueueOptions = {
    ...defaultOptions,
    ...options,
  };
  const [queue, setQueue] = useState<T[]>(initial);
  const [maxItems, setMaxItems] = useState(initialMaxItems);
  const addItem = (item: T) => {
    if (queue.length < maxItems) {
      setQueue((p) => [...p, item]);

      return;
    }

    setQueue((p) => {
      const newQueue = [...p];

      newQueue.shift();
      newQueue.push(item);

      return newQueue;
    });
  };

  useEffect(() => {
    // If the maxItems changes, we need to update the queue
    if (maxItems < queue.length) {
      setQueue((p) => p.slice(p.length - maxItems));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxItems]);

  const reset = () => {
    setQueue([]);
  };

  return {
    queue,
    addItem,
    setMaxItems,
    resetQueue: reset,
  };
}
