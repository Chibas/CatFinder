import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number = 3000): any => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    let timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
};
