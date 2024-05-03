import { useEffect, useState } from "react";

const randomNumber = Math.floor(Math.random() * 10);

const token = import.meta.env.VITE_MY_API_TOKEN;

const maxRating = 3;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export function fetchData(queryOptions = {}) {
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const defaultQueryOptions = {
    include_adult: false,
    include_video: true,
    language: "fr",
    page: randomNumber,
    "vote_average.lte": 10,
    "vote_count.gte": 20,
    sort_by: "popularity.asc",
  };

  const queryString = () => {
    let finalQueryOptions = Object.assign({}, defaultQueryOptions, queryOptions);
    return Object.entries(finalQueryOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  console.log(queryString());
  useEffect(() => {
    try {
      fetch(`https://api.themoviedb.org/3/discover/movie?${queryString()}`, options)
        .then((response) => response.json())
        .then((data) => {
          setIsloading(false);
          setData(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { data, isLoading };
}
