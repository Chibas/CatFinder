import React, { useCallback, useEffect, useRef } from "react";
import { useLazySearchImagesQuery } from "../store/thecat/thecat.api";
import CatCard from "../components/CatCard";
import BreedSelector from "../components/BreedSelector";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";
import { CatImage } from "../models/models";

const limit = 10;

const HomePage = () => {
  const selectedBreedsIds = useAppSelector((state) => state.theCat.breedIds);
  const selectedPage = useAppSelector((state) => state.theCat.page);

  const { setImages, setPage } = useActions();
  const [
    fetchImages,
    {
      isLoading: isImagesLoading,
      isFetching: isImageFetching,
      isError: isImagesError,
      data: images,
    },
  ] = useLazySearchImagesQuery();

  const intObserver = useRef<IntersectionObserver>();
  const lastImageRef = useCallback(
    (image: HTMLDivElement) => {
      if (isImagesLoading || isImageFetching) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((images) => {
        if (images[0].isIntersecting) {
          setPage(selectedPage + 1);
        }
      });
      if (image) intObserver.current.observe(image);
    },
    [isImagesLoading, isImageFetching, selectedPage, setPage]
  );

  useEffect(() => {
    fetchImages({ limit, page: selectedPage, breed_ids: selectedBreedsIds });
  }, [selectedBreedsIds, fetchImages, selectedPage]);

  useEffect(() => {
    setImages(images);
  }, [images, setImages]);

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <BreedSelector />

      <div className="container flex flex-wrap justify-center gap-6 pt-10 after:content-[''] grow-[999]">
        {isImagesError && (
          <p className="text-center text-red-600">Fetching images failed</p>
        )}
        {images?.map((image: CatImage, i) => {
          if (i === images.length - 1) {
            return (
              <CatCard key={image.id + i} ref={lastImageRef} catImage={image} />
            );
          }
          return <CatCard key={image.id + i} catImage={image} />;
        })}
        {(isImagesLoading || isImageFetching) && (
          <div className="flex items-center justify-center mt-10 w-full">
            <img
              className="animate-spin mr-2"
              src="/loading.png"
              alt="loading"
            />
            Loading images...
          </div>
        )}
        {!isImagesLoading && !images?.length && <p>No images found</p>}
      </div>
    </div>
  );
};

export default HomePage;
