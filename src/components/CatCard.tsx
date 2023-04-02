import { forwardRef, useEffect, useRef, useState } from "react";
import { CatImage } from "../models/models";
import LoadingIndicator from "./LoadingIndicator";

type CatCardProps = {
  catImage: CatImage;
  handleVote: Function;
  handleFavourite: Function;
  loading: boolean;
  disableVoting?: boolean;
};

type ActionItemProps = {
  imageName: string;
  action: Function;
  active?: boolean;
};

const ActionItem = ({ imageName, action, active = false }: ActionItemProps) => {
  return (
    <img
      src={`/${imageName}`}
      alt="upvote"
      className="voteImg h-[45px] float-left hover:drop-shadow-[2px_4px_6px_#ffffff]"
      style={
        active
          ? { filter: "invert(0.5) sepia(1) saturate(5) hue-rotate(180deg)" }
          : {}
      }
      onClick={() => action()}
    />
  );
};

const CatCard = forwardRef<HTMLDivElement, CatCardProps>(
  (
    { catImage, handleVote, handleFavourite, loading, disableVoting = false },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isUpvoated, setIsUpvoated] = useState(false);
    const [isDownvoated, setIsDownvoated] = useState(false);
    const [isFavourited, setIsFavourited] = useState(false);

    const localRef = useRef<HTMLDivElement>(null);
    const cardRef = ref || localRef;

    const upvoteImage = () => {
      if (loading) return;
      setIsUpvoated(!isUpvoated);
      isDownvoated && setIsDownvoated(isUpvoated);
      handleVote(isUpvoated ? 0 : 1, catImage.id);
    };

    const downvoteImage = () => {
      if (loading) return;
      setIsDownvoated(!isDownvoated);
      isUpvoated && setIsUpvoated(isDownvoated);
      handleVote(isDownvoated ? 0 : -1, catImage.id);
    };

    const favouriteImage = () => {
      if (loading) return;
      setIsFavourited(!isFavourited);
      !catImage.hasOwnProperty("favourite")
        ? handleFavourite(false, catImage.id)
        : handleFavourite(true, catImage.favourite!.id);
    };
    useEffect(() => {
      catImage.hasOwnProperty("vote") &&
        (catImage.vote?.value! > 0
          ? setIsUpvoated(true)
          : setIsDownvoated(true));
      catImage.hasOwnProperty("favourite") && setIsFavourited(true);
    }, [catImage]);

    return (
      <div
        className="flex-auto relative h-[300px] cursor-pointer"
        ref={cardRef}
      >
        {!imageLoaded && (
          <div className="animate-pulse bg-gray-500 h-full w-full min-w-[350px] text-white flex items-center justify-center">
            <LoadingIndicator />
            <p className="ml-2">Image Loading...</p>
          </div>
        )}
        <img
          className={imageLoaded ? "w-full h-full object-cover" : "hidden"}
          src={catImage.url}
          alt={catImage.id}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute flex justify-between items-center w-full h-[60px] bg-slate-800/50 bottom-0 px-3">
          {!disableVoting && (
            <div className="votesWrapped">
              <ActionItem
                imageName="upvote.svg"
                action={upvoteImage}
                active={isUpvoated}
              />
              <ActionItem
                imageName="downvote.svg"
                action={downvoteImage}
                active={isDownvoated}
              />
            </div>
          )}
          <ActionItem
            imageName="heart.svg"
            action={favouriteImage}
            active={isFavourited}
          />
        </div>
      </div>
    );
  }
);

export default CatCard;
