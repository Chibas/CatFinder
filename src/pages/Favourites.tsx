import ImagesList from "../components/ImagesList";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { useGetFavouritesQuery } from "../store/thecat/thecat.api";

const FavouritesPage = () => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);
  const selectedPage = useAppSelector((state) => state.theCat.page);
  const { setPage } = useActions();
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
        selectedPage={selectedPage}
        setPage={setPage}
        disableVoting={true}
      />
    </div>
  );
};

export default FavouritesPage;
