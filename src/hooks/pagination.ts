import { useState } from "react";
import { useDebounce } from "./debounce";

export const usePagination = () => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const debouncedPage = useDebounce(selectedPage, 1500);

  const selectNextPage = () => {
    if (selectedPage < totalPages) {
      setSelectedPage(debouncedPage + 1);
    }
  };

  const selectPage = (page: number) => {
    if (page <= totalPages) {
      setSelectedPage(page);
    }
  };

  return { selectedPage, selectPage, selectNextPage, setTotalPages };
};

export default usePagination;
