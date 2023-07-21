import React, { useCallback, useEffect, useState } from "react";
import { useSearchImagesQuery } from "../store/thecat/thecat.api";
import BreedSelector from "../components/BreedSelector";
import { useAppSelector } from "../hooks/redux";
import ImagesList from "../components/ImagesList";
import usePagination from "../hooks/pagination";

const limit = 10;

const HomePage = () => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);
  const { selectedPage, selectPage, selectNextPage, setTotalPages } =
    usePagination();
  const [selectedBreedIds, setSelectedBreedIds] = useState<string[]>([]);
  const { isLoading, isFetching, isError, data } = useSearchImagesQuery({
    limit,
    page: selectedPage,
    breed_ids: selectedBreedIds,
    sub_id: currentUserId,
  });

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data?.totalPages);
    }
  }, [data, setTotalPages]);

  const handleBreedChange = useCallback(
    (ids: string[] = []) => {
      selectPage(0);
      setSelectedBreedIds(ids);
    },
    [selectPage, setSelectedBreedIds]
  );

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <BreedSelector handleSelect={handleBreedChange} />
      <ImagesList
        data={data?.items}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        currentUserId={currentUserId}
        setNextPage={selectNextPage}
      />
    </div>
  );
};

export default HomePage;
