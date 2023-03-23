import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 200): string => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    let timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout)
  }, [value, delay]);
  
  return debounced;
}