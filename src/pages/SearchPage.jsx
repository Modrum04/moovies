import SearchBar from "../components/SearchBar";
import { useState, useEffect, useRef } from "react";
import { fetchData } from "../tools/fetchData";
import Card from "../components/Card";
import "./SearchPage.scss";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const { data: fetchedData } = fetchData("search", {
    query: searchText,
    page: currentPage,
  });
  const observer = useRef();

  useEffect(() => {
    if (searchText !== "") {
      setData(null);
    }
  }, [searchText]);

  useEffect(() => {
    if (fetchedData) {
      setData((prevData) => {
        if (prevData && prevData.results) {
          return {
            ...prevData,
            page: fetchedData.page,
            results: [...prevData.results, ...fetchedData.results],
          };
        } else {
          return fetchedData;
        }
      });
    }
  }, [fetchedData]);

  useEffect(() => {
    if (!data) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const handleIntersection = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && currentPage < fetchedData.total_pages && !isLoading) {
        setIsloading(true);
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          setIsloading(false);
        }, 1000);
      }
    };

    observer.current = new IntersectionObserver(handleIntersection, options);
    observer.current.observe(document.querySelector(".observer"));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [data, currentPage, isLoading]);

  return (
    <div className="container-searchPage">
      {console.log(data)}
      <SearchBar setSearch={setSearchText} search={searchText} setPage={setCurrentPage} />

      {data?.results?.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <p>Nombre de résultats : {fetchedData?.total_results}</p>
        </div>
      )}
      {searchText === "" && <i className="fi fi-ts-popcorn" />}
      {searchText !== "" && fetchedData.results?.length === 0 && (
        <p>Désolé, aucun film ne correspond à ta recherche</p>
      )}

      <div className="grid-container-cards">
        {data?.results?.length > 0 &&
          searchText !== "" &&
          data?.results?.map((movie) => (
            <>
              <Card
                key={movie.id}
                originalTitle={movie?.original_title}
                poster={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                overview={movie?.overview}
                voteAverage={movie?.vote_average}
                filmid={movie?.id}
                title={movie?.title}
              />
            </>
          ))}
      </div>
      <div className="observer" />
      {isLoading && searchText && <h3>En chargement...</h3>}
    </div>
  );
}

export default SearchPage;
