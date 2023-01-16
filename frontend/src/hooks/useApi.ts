import { useEffect, useState } from "react";
import APIManager from "../services/APIManager";

const useAPI = <ResponseAPI, Deps extends unknown[] = []>(
  method: "get" | "post",
  endpoint: string,
  deps: Deps,
  body: object = {},
  // deps: [string] extends [...args: any[], last: any] ? Deps : [] = ['123'],
  depsCondition?: (args: Deps | []) => boolean,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestBody, setRequestBody] = useState(body);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResponseAPI | null>(null);
  
  useEffect(() => {
    if (depsCondition && !depsCondition(deps)) return;

    setIsLoading(true);
    APIManager[method](endpoint, requestBody as unknown as undefined)
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));

  }, [...deps, endpoint, requestBody]);

  return {
    isLoading,
    data,
    setRequestBody,
    error,
  };
};

export default useAPI;