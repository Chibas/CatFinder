import { useCallback } from "react";
import { useActions } from "../hooks/actions";
import { useGetBreedsQuery } from "../store/thecat/thecat.api";
import Dropdown from "./Dropdown";

type BreedSelectorProps = {
  handleSelect?: Function;
};

const BreedSelector = ({ handleSelect }: BreedSelectorProps) => {
  const {
    isLoading: isBreedsLoading,
    isError: isBreedsError,
    data: breeds,
  } = useGetBreedsQuery();
  const { setBreedIds } = useActions();

  const handleSelectedChange = useCallback((ids: string[]) => {
    handleSelect && handleSelect(0);
    setBreedIds(ids);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dropdown
      data={breeds}
      loading={isBreedsLoading}
      error={isBreedsError}
      handleSelectedChange={handleSelectedChange}
    />
  );
};

export default BreedSelector;
