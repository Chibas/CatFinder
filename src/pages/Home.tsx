import React, { useState } from "react";
import { useSearchImagesQuery } from "../store/thecat/thecat.api";
import BreedSelector from "../components/BreedSelector";
import { useAppSelector } from "../hooks/redux";
import ImagesList from "../components/ImagesList";
import { useDebounce } from "../hooks/debounce";

const limit = 10;

const HomePage = () => {
  const selectedBreedsIds = useAppSelector((state) => state.theCat.breedIds);
  const [selectedPage, setSelectedPage] = useState(0);
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);
  const debouncedPage = useDebounce(selectedPage);
  const { isLoading, isFetching, isError, data } = useSearchImagesQuery({
    limit,
    page: selectedPage,
    breed_ids: selectedBreedsIds,
    sub_id: currentUserId,
  });

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <BreedSelector handleSelect={setSelectedPage} />
      <ImagesList
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        currentUserId={currentUserId}
        selectedPage={debouncedPage}
        setPage={setSelectedPage}
      />
    </div>
  );
};

export default HomePage;
