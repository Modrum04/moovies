import { useEffect, useState } from "react";

const token = import.meta.env.VITE_MY_API_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const queryList = {
  discover: {
    endPoint: "discover/movie?",
    defaultQueryOptions: {
      include_adult: false,
      include_video: true,
      language: "fr",
      page: 1,
      "vote_average.lte": 10,
      "vote_count.gte": 20,
      sort_by: "popularity.asc",
    },
  },
  filter: {
    endPoint: "genre/movie/list?",
    defaultQueryOptions: {
      language: "fr",
    },
  },
  search: {
    endPoint: "search/movie?",
    defaultQueryOptions: {
      query: "",
      include_adult: false,
      language: "fr",
      page: 1,
      "vote_average.lte": 10,
      "vote_count.gte": 20,
      sort_by: "popularity.asc",
    },
  },
};

export function fetchData(selectedEndpoint, queryOptions = {}) {
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const queryString = () => {
    console.log(queryList[selectedEndpoint]);
    let finalQueryOptions = Object.assign(
      {},
      queryList[selectedEndpoint]?.defaultQueryOptions,
      queryOptions,
    );
    return (
      queryList[selectedEndpoint].endPoint +
      Object.entries(finalQueryOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    );
  };

  useEffect(() => {
    try {
      fetch(`https://api.themoviedb.org/3/${queryString()}`, options)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsloading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [queryString()]);

  return { data, isLoading };
}
