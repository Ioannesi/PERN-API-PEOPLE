import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [responseMessage, setResponseMessage] = useState (false);
  const activeHttpRequests = useRef([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResponseMessage(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [responseMessage]);
   

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      setResponseMessage(false)
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );
        if (response.ok && (method === 'DELETE' || method=== 'POST' ||method==='GET')) {
          setResponseMessage(true);
        }
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError, responseMessage };
};
