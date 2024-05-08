import SearchBar from "../components/SearchBar";
import { useState, useEffect, useRef } from "react";
import { fetchData } from "../tools/fetchData";
import Card from "../components/Card";
import "./SearchPage.scss";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { data: fetchedData } = fetchData("search", {
    query: searchText,
    page: currentPage,
  });
  const observer = useRef();

  useEffect(() => {
    setData([]);
  }, [searchText]);

  useEffect(() => {
    if (fetchedData && data.length > 0) {
      setData((prev) => [...prev, fetchedData]);
    } else {
      setData([fetchedData]);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (currentPage < 1) return;

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
        }, 500);
      }
    };

    observer.current = new IntersectionObserver(handleIntersection, options);
    observer.current.observe(document.querySelector(".observer"));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [data]);

  return (
    <div className="container-searchPage">
      {console.log(data)}
      <div className="container-search-menu">
        <SearchBar setSearch={setSearchText} search={searchText} setPage={setCurrentPage} />
        <button onClick={() => setCurrentPage(currentPage + 1)}>{fetchedData?.total_pages}</button>
      </div>

      {data?.results?.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <p>Nombre de résultats obtenus : {fetchedData?.total_results}</p>
        </div>
      )}

      {searchText === "" && <i className="fi fi-ts-popcorn" />}
      {searchText !== "" && fetchedData.results?.length === 0 && (
        <p>Désolé, aucun film ne correspond à ta recherche</p>
      )}

      <>
        {data &&
          searchText !== "" &&
          data?.map((objResults) => (
            <>
              <h1 className={`page-start-${objResults.page}`}>
                Page : {objResults.page} sur {objResults.total_pages} -{" "}
                <em>{objResults.results?.length} résultats</em>
              </h1>
              <div className="grid-container-cards">
                {objResults?.results?.map((movie, i, arr) => (
                  <Card
                    key={movie.id}
                    originalTitle={movie?.original_title}
                    poster={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    overview={movie?.overview}
                    voteAverage={movie?.vote_average}
                    filmid={movie?.id}
                    title={movie?.title}
                    resultNumber={
                      i + 1 + (objResults.page - 1) * 20 + " sur " + fetchedData?.total_results
                    }
                  />
                ))}{" "}
              </div>
            </>
          ))}
      </>
      <div className="observer" style={{ minHeight: "10dvh" }}>
        {isLoading && searchText && <h1>En chargement...</h1>}
      </div>
    </div>
  );
}

export default SearchPage;
