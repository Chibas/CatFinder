import { useActions } from "../hooks/actions";
import { useGetBreedsQuery } from "../store/thecat/thecat.api";
import Dropdown from "./Dropdown";

const BreedSelector = () => {
  const { isLoading: isBreedsLoading, isError: isBreedsError, data: breeds } = useGetBreedsQuery();
  const { setBreedIds} = useActions();
    
  return (
    <Dropdown data={breeds} loading={isBreedsLoading} error={isBreedsError} handleSelectedChange={setBreedIds} />
  )
};

export default BreedSelector;