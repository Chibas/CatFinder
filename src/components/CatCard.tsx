import { CatImage } from "../models/models";

const CatCard = ({ catImage }: { catImage: CatImage }) => {
  return (
    <div className="flex-auto h-[300px] cursor-pointer ">
      <img
        className="w-full h-full object-cover"
        src={catImage.url}
        alt={catImage.id}
      />
    </div>
  );
};

export default CatCard;
