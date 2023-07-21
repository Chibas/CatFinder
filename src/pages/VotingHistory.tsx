import { useEffect } from "react";
import ImagesList from "../components/ImagesList";
import usePagination from "../hooks/pagination";
import { useAppSelector } from "../hooks/redux";
import { useGetVotesQuery } from "../store/thecat/thecat.api";

const VotingHistory = () => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);
  const { selectedPage, selectNextPage, setTotalPages } = usePagination();
  const { data, isLoading, isFetching, isError } = useGetVotesQuery({
    sub_id: currentUserId,
    page: selectedPage,
  });

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data?.totalPages);
    }
  }, [data, setTotalPages]);

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <ImagesList
        data={data?.items}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        currentUserId={currentUserId}
        setNextPage={selectNextPage}
      />
    </div>
  );
};

export default VotingHistory;
