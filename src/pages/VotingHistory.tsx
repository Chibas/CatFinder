import { useState } from "react";
import ImagesList from "../components/ImagesList";
import { useDebounce } from "../hooks/debounce";
import { useAppSelector } from "../hooks/redux";
import { useGetVotesQuery } from "../store/thecat/thecat.api";

const VotingHistory = () => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id!);
  const [selectedPage, setSelectedPage] = useState(0);
  const { data, isLoading, isFetching, isError } = useGetVotesQuery({
    sub_id: currentUserId,
    page: selectedPage,
  });
  const debouncedPage = useDebounce(selectedPage);

  return (
    <div className="flex flex-col items-center mx-auto py-10 w-screen">
      <ImagesList
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        currentUserId={currentUserId}
        selectedPage={debouncedPage}
        setPage={setSelectedPage}
      />
    </div>
  );
};

export default VotingHistory;
