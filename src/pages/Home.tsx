import React, { useCallback, useEffect, useState } from "react";
import {useLazySearchImagesQuery } from "../store/thecat/thecat.api";
import CatCard from "../components/CatCard";
import BreedSelector from "../components/BreedSelector";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";

const step = 10;

const HomePage = () => {
  const [limit, setLimit] = useState<number>(step);
  const selectedBreedsIds = useAppSelector(state => state.theCat.breedIds);
  const { setImages } = useActions()
  const [ fetchImages, { isLoading: isImagesLoading, isError: isImagesError, data: images } ] = useLazySearchImagesQuery();

  useEffect(() => {
    fetchImages({limit, breed_ids: selectedBreedsIds})
  }, [selectedBreedsIds, fetchImages, limit]);

  useEffect(() => {
    setImages(images);
  }, [images, setImages])


  const handleLoadMoreClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setLimit(limit + step);
  }, [limit]);
  
  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <BreedSelector />

      <div className="container flex flex-wrap justify-center gap-6 pt-10 after:content-[''] grow-[999]">
        { isImagesLoading && <p className="text-center">Loading images...</p> }
        { isImagesError && <p className="text-center text-red-600">Fetching images failed</p> }
        { images?.map(image => (
          <CatCard key={image.id} catImage={image}/>
        )) }
      </div>

      <button
        className="my-10 bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-700"
        onClick={handleLoadMoreClick}
      >
        Load more
      </button>
    </div>
  )
}

export default HomePage;