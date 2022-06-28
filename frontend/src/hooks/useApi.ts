import { useEffect, useState } from "react";
import APIManager from "../services/APIManager";

const useAPI = <ResponseAPI>(
  method: "get",
  endpoint: string,
  deps: unknown[] = [],
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResponseAPI | null>(null);

  useEffect(() => {
    setIsLoading(true);
    APIManager[method](endpoint)
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [...deps, endpoint]);

  return {
    isLoading,
    data,
    error,
  };
};

export default useAPI;