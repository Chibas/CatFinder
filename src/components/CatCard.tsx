import { forwardRef, useRef, useState } from "react";
import { CatImage } from "../models/models";
import LoadingIndicator from "./LoadingIndicator";

type CatCardProps = {
  catImage: CatImage
};

const CatCard = forwardRef<HTMLDivElement, CatCardProps>(({catImage}, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const localRef = useRef<HTMLDivElement>(null);
  const cardRef = ref || localRef;

  return (
    <div className="flex-auto h-[300px] cursor-pointer" ref={cardRef}>
      {
        !imageLoaded &&
        <div className="animate-pulse bg-gray-500 h-full w-full min-w-[350px] text-white flex items-center justify-center">
          <LoadingIndicator /><p className="ml-2">Image Loading...</p>
        </div> 
      }
      <img
        className={imageLoaded ? 'w-full h-full object-cover' : 'hidden'}
        src={catImage.url}
        alt={catImage.id}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
});

export default CatCard;
