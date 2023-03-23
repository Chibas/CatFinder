import React, { useEffect } from "react";
import { useLazySearchImagesQuery } from "../store/thecat/thecat.api";
import CatCard from "../components/CatCard";
import BreedSelector from "../components/BreedSelector";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";

const limit = 10;

const HomePage = () => {
  const selectedBreedsIds = useAppSelector((state) => state.theCat.breedIds);
  const selectedPage = useAppSelector((state) => state.theCat.page);
  const { setImages, setPage } = useActions();
  const [
    fetchImages,
    { isLoading: isImagesLoading, isError: isImagesError, data: images },
  ] = useLazySearchImagesQuery();

  useEffect(() => {
    fetchImages({ limit, page: selectedPage, breed_ids: selectedBreedsIds });
  }, [selectedBreedsIds, fetchImages, selectedPage]);

  useEffect(() => {
    setImages(images);
  }, [images, setImages]);

  const handleLoadMoreClick = () => {
    setPage(selectedPage + 1);
  };

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <BreedSelector />

      <div className="container flex flex-wrap justify-center gap-6 pt-10 after:content-[''] grow-[999]">
        {isImagesLoading && <p className="text-center">Loading images...</p>}
        {isImagesError && (
          <p className="text-center text-red-600">Fetching images failed</p>
        )}
        {images?.map((image, i) => (
          <CatCard key={image.id + i} catImage={image} />
        ))}
      </div>

      <button
        className="my-10 bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-700"
        onClick={handleLoadMoreClick}
      >
        Load more
      </button>
    </div>
  );
};

export default HomePage;
