import SearchBar from "../components/SearchBar";
import { useState, useEffect, useRef } from "react";
import { fetchData, useInfiniteScroll } from "../tools/fetchData";
import Card from "../components/Card";
import "./SearchPage.scss";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { fetchedData } = fetchData("search", {
    query: searchText,
    page: currentPage,
  });
  const { data, isLoading } = useInfiniteScroll(
    fetchedData,
    searchText,
    currentPage,
    setCurrentPage,
  );

  return (
    <>
      <div className="container-searchPage">
        <div className="container-search-menu">
          <SearchBar setSearch={setSearchText} search={searchText} setPage={setCurrentPage} />
        </div>
        {data?.length !== 0 && searchText !== "" && (
          <div className="container-handleChange">
            <p>Nombre de résultats obtenus : {fetchedData?.total_results}</p>
          </div>
        )}
        {searchText === "" && <i className="fi fi-ts-popcorn" />}
        {searchText !== "" && fetchedData.results?.length === 0 && (
          <p>Aucun film ne correspond à votre recherche</p>
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
                  {objResults?.results?.map((movie, i) => {
                    movie.resultNumb = i + 1 + (objResults.page - 1) * 20;
                    return (
                      <Card
                        key={movie.id}
                        originalTitle={movie?.original_title}
                        poster={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                        overview={movie?.overview}
                        voteAverage={movie?.vote_average}
                        filmid={movie?.id}
                        title={movie?.title}
                        resultNumber={movie?.resultNumb + " sur " + fetchedData?.total_results}
                      />
                    );
                  })}{" "}
                </div>
              </>
            ))}
        </>
        <div className="observer" style={{ minHeight: "10dvh" }}>
          {isLoading && searchText && <h1>En chargement...</h1>}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
