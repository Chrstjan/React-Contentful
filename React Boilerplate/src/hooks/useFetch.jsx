import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, [url]);

  return { data, isLoading };
};
