import { useCallback, useRef } from "react";
import { CatImage } from "../models/models";
import {
  useVoteForImageMutation,
  useFavouriteImageMutation,
  useUnfavouriteImageMutation,
  VoteDTO,
} from "../store/thecat/thecat.api";
import CatCard from "./CatCard";

type ImagesListProps = {
  data?: CatImage[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  currentUserId: string;
  setPage?: Function;
  selectedPage?: number;
  disableVoting?: boolean;
};

const ImagesList = ({
  data,
  isLoading,
  isFetching,
  isError,
  currentUserId,
  setPage,
  selectedPage = 0,
  disableVoting = false,
}: ImagesListProps) => {
  const [voteForImage, { isLoading: isVoting }] = useVoteForImageMutation();
  const [favouriteImage, { isLoading: isFavouriting }] =
    useFavouriteImageMutation();
  const [unFavouriteImage, { isLoading: isUnfavouriting }] =
    useUnfavouriteImageMutation();

  const intObserver = useRef<IntersectionObserver>();
  const lastImageRef = useCallback(
    (image: HTMLDivElement) => {
      if (isLoading || isFetching || !setPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((images) => {
        if (images[0].isIntersecting) {
          setPage(selectedPage + 1);
        }
      });
      if (image) intObserver.current.observe(image);
    },
    [isLoading, isFetching, selectedPage, setPage]
  );

  const handleVote = useCallback(
    (value: boolean, image_id: string) => {
      const data: VoteDTO = {
        value,
        image_id,
        sub_id: currentUserId,
      };
      voteForImage(data);
    },
    [currentUserId, voteForImage]
  );

  const handleFavourite = useCallback(
    (alreadyFavourited: boolean, id: string) => {
      if (!alreadyFavourited) {
        const data: Partial<VoteDTO> = {
          image_id: id,
          sub_id: currentUserId,
        };
        favouriteImage(data);
      } else {
        unFavouriteImage(id);
      }
    },
    [currentUserId, favouriteImage, unFavouriteImage]
  );

  return (
    <div className="container flex flex-wrap justify-center gap-6 pt-10 after:content-[''] grow-[999]">
      {isError && (
        <p className="text-center text-red-600">Fetching images failed</p>
      )}
      {data?.map((image: CatImage, i: number) => {
        return (
          <CatCard
            key={image.id + i}
            ref={i === data.length - 1 ? lastImageRef : undefined}
            catImage={image}
            handleVote={handleVote}
            handleFavourite={handleFavourite}
            loading={isVoting || isFavouriting || isUnfavouriting}
            disableVoting={disableVoting}
          />
        );
      })}
      {(isLoading || isFetching) && (
        <div className="flex items-center justify-center mt-10 w-full">
          <img
            className="animate-spin mr-2 w-[36px] h-[36px]"
            src="/loading.svg"
            alt="loading"
          />
          Loading images...
        </div>
      )}
      {!isLoading && !data?.length && <p>No images found</p>}
    </div>
  );
};

export default ImagesList;
