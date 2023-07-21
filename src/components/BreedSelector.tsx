import { useCallback } from "react";
import { useGetBreedsQuery } from "../store/thecat/thecat.api";
import Dropdown from "./Dropdown";

type BreedSelectorProps = {
  handleSelect(ids: string[]): void;
};

const BreedSelector = ({ handleSelect }: BreedSelectorProps) => {
  const {
    isLoading: isBreedsLoading,
    isError: isBreedsError,
    data: breeds,
  } = useGetBreedsQuery();

  const handleSelectedChange = useCallback((ids: string[]) => {
    handleSelect(ids);
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
