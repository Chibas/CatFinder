import { useCallback, useEffect, useRef, useState } from "react";

type Option = {
  id: string;
  name: string;
};

export const Dropdown = <T extends Option>({
  data,
  loading,
  error,
  handleSelectedChange,
}: {
  data: T[] | undefined;
  loading: boolean;
  error: boolean;
  handleSelectedChange: Function;
}) => {
  const [search, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as HTMLElement)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    handleSelectedChange(selectedIds);
  }, [selectedIds, handleSelectedChange]);

  const handleOptionClick = useCallback(
    (id: string) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      let includesId: boolean = false;
      const IdsList = selectedIds.filter((selectedId) => {
        if (selectedId === id) {
          includesId = true;
          return false;
        }
        return true;
      });
      if (!includesId) IdsList.push(id);
      setSelectedIds(IdsList);
    },
    [selectedIds]
  );
    console.log(data)
  const handleSetDropdown =
    (value: boolean) =>
    (e: React.MouseEvent<HTMLElement> | React.FocusEvent) => {
      e.stopPropagation();
      if (e.target === e.currentTarget) setShowDropdown(value);
    };

  const list = data
    ?.filter(
      (item) =>
        item.name!.toLowerCase().includes(search) ||
        selectedIds.includes(item.id)
    )
    ?.sort(
      (a: T, b: T) => +selectedIds.includes(b.id) - +selectedIds.includes(a.id)
    );

  return (
    <div className="relative md:w-[560px] sm:w-full sm:px-2" ref={ref}>
      <input
        type="text"
        className="border py-2 px-4 w-full h-[42px] mb-2"
        placeholder="Please type cat breed"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target?.value.toLowerCase())
        }
        onFocus={handleSetDropdown(true)}
      />

      {selectedIds.map((id) => (
        <div
          key={id}
          className="inline py-1 px-2 text-xs text-gray-500 bg-gray-200 mr-2 rounded"
        >
          {id}
          <span className="ml-2 cursor-pointer" onClick={handleOptionClick(id)}>
            X
          </span>
        </div>
      ))}

      {showDropdown && (
        <ul className="absolute list-none top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
          {loading && <p className="text-center">Loading breeds list...</p>}
          {error && (
            <p className="text-center text-red-600">
              Unknown error occured while loading
            </p>
          )}
          {list?.map((item) => (
            <li
              key={item.id}
              className="flex py-2 px-4 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer justify-between"
              onClick={handleOptionClick(item.id)}
            >
              {item.name}
              <span className="text-gray-500 text-xs">
                {selectedIds.includes(item.id) && "selected"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
