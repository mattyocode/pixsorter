import { useState, useCallback } from "react";

type sendRequestTypes = (requestConfig: any, applyData: any) => Promise<void>;

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const sendRequest: sendRequestTypes = useCallback(
    async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
