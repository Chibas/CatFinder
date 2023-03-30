import React, { useEffect } from "react";
import { useLazySearchImagesQuery } from "../store/thecat/thecat.api";
import BreedSelector from "../components/BreedSelector";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";
import ImagesList from "../components/ImagesList";

const limit = 10;

const HomePage = () => {
  const selectedBreedsIds = useAppSelector((state) => state.theCat.breedIds);
  const selectedPage = useAppSelector((state) => state.theCat.page);
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);

  const { setPage } = useActions();
  const [fetchImages, { isLoading, isFetching, isError, data }] =
    useLazySearchImagesQuery();

  useEffect(() => {
    fetchImages({
      limit,
      page: selectedPage,
      breed_ids: selectedBreedsIds,
      sub_id: currentUserId,
    });
  }, [selectedBreedsIds, fetchImages, selectedPage, currentUserId]);

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <BreedSelector />
      <ImagesList
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        currentUserId={currentUserId}
        selectedPage={selectedPage}
        setPage={setPage}
      />
    </div>
  );
};

export default HomePage;
