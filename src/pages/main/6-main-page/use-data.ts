import { useState, useEffect } from 'react';

interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
}

export const useData = <T>(url: string): UseDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      let ignore = false;

      setLoading(true);

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        })
        .finally(() => setLoading(false));

      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return { data, loading };
};
