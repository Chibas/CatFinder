import { useAppSelector } from "../hooks/redux";
import { useGetFavouritesQuery } from "../store/thecat/thecat.api";

const FavoritesPage = () => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);
  const {
    data: imagesList,
    isLoading,
    isError,
  } = useGetFavouritesQuery({ sub_id: currentUserId });
  return (
    <div className="container mx-auto py-10 w-screen text-center">
      <h3 className="text-gray-600">No Images Found {"=("}</h3>
    </div>
  );
};

export default FavoritesPage;
