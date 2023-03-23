import { useCallback } from "react";
import { useActions } from "../hooks/actions";
import { useGetBreedsQuery } from "../store/thecat/thecat.api";
import Dropdown from "./Dropdown";

const BreedSelector = () => {
  const { isLoading: isBreedsLoading, isError: isBreedsError, data: breeds } = useGetBreedsQuery();
  const { setBreedIds, setPage } = useActions();

  const handleSelectedChange = useCallback((ids: string[]) => {
    setPage(0);
    setBreedIds(ids)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
  return (
    <Dropdown data={breeds} loading={isBreedsLoading} error={isBreedsError} handleSelectedChange={handleSelectedChange} />
  )
};

export default BreedSelector;