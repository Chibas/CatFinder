import ImagesList from "../components/ImagesList";
import { useAppSelector } from "../hooks/redux";
import { useGetFavouritesQuery } from "../store/thecat/thecat.api";

const FavouritesPage = () => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);
  const { data, isLoading, isFetching, isError } = useGetFavouritesQuery({
    sub_id: currentUserId,
  });

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <ImagesList
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        currentUserId={currentUserId}
        disableVoting={true}
      />
    </div>
  );
};

export default FavouritesPage;
