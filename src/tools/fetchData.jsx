import { useEffect, useState, useRef } from "react";

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
      language: "fr-FR",
      page: 1,
      sort_by: "popularity.dsc",
    },
  },
  filter: {
    endPoint: "genre/movie/list?",
    defaultQueryOptions: {
      language: "fr-FR",
    },
  },
  searchMoovie: {
    endPoint: "search/movie?",
    defaultQueryOptions: {
      query: "",
      include_adult: false,
      language: "fr-FR",
      page: 1,
      "vote_average.lte": 10,
      "vote_count.gte": 20,
      sort_by: "popularity.asc",
    },
  },
  searchPerson: {
    endPoint: "search/person?",
    defaultQueryOptions: {
      query: "",
      include_adult: false,
      language: "fr-FR",
      page: 1,
    },
  },
  details: {
    endPoint: "movie/",
    defaultQueryOptions: {
      append_to_response: "credits",
      language: "fr-FR",
    },
  },
  person: {
    endPoint: "person/",
    defaultQueryOptions: {
      append_to_response: "combined_credits",
      language: "fr-FR",
    },
  },
};

export function fetchData(selectedEndpoint, queryOptions = {}, source) {
  const [fetchedData, setfetchedData] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const queryString = () => {
    let finalQueryOptions = Object.assign(
      {},
      queryList[selectedEndpoint]?.defaultQueryOptions,
      queryOptions,
    );
    return (
      queryList[selectedEndpoint].endPoint +
      Object.entries(finalQueryOptions)
        .map(([key, value]) => (value !== "?" ? `${key}=${value}` : key + value))
        .join("&")
    );
  };

  useEffect(() => {
    if (source === "") {
      return;
    }

    try {
      fetch(`https://api.themoviedb.org/3/${queryString()}`, options)
        .then((response) => response.json())
        .then((data) => {
          setfetchedData(data);
          setIsloading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [queryString()]);

  return { fetchedData, isLoading };
}

export function useInfiniteScroll(fetchedData, useSource, currentPage, setCurrentPage) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    if (!fetchedData.results || fetchedData.results.length === 0) {
      setData([]);
    } else if (fetchedData.page === 1) {
      setData([fetchedData]);
    } else {
      setData((prev) => [...prev, fetchedData]);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (fetchedData.total_pages < 2) return;

    const optionsForIntersectionObserver = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && currentPage < fetchedData.total_pages && !isLoading) {
        setIsloading(true);
        setTimeout(() => {
          setCurrentPage((prev) => prev + 1);
          setIsloading(false);
        }, 500);
      }
    };

    observer.current = new IntersectionObserver(handleIntersection, optionsForIntersectionObserver);
    observer.current.observe(document.querySelector(".observer"));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [data]);

  return { data, isLoading };
}
