import { useState, useCallback } from "react";

export const useSearchValue = () => {
  const [searchValues, setSearchValues] = useState({
    ownerName: "",
    product: "",
    size: "",
    isAvailable: null,
  });

  const handleSearch = useCallback((key, value) => {
    setSearchValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  return [searchValues, handleSearch];
};
