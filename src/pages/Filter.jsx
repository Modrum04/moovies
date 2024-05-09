import "./Filter.scss";
import { useState } from "react";
import { fetchData, useInfiniteScroll } from "../tools/fetchData";
import FilterByGenre from "../components/FilterByGenre";
import Card from "../components/Card";

function Filter() {
  const [genre, setGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchedData } = fetchData("discover", {
    sort_by: "popularity.dsc",
    page: currentPage,
    with_genres: genre,
  });
  const { data, isLoading } = useInfiniteScroll(fetchedData, genre, currentPage, setCurrentPage);

  return (
    <>
      <div className="global-filter">
        <FilterByGenre setGenre={setGenre} setPage={setCurrentPage} />
      </div>
      <div className="filter-card-container">
        {data &&
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
          ))}{" "}
        <div className="observer" style={{ minHeight: "10dvh" }}>
          {isLoading && <h1>En chargement...</h1>}
        </div>
      </div>
    </>
  );
}
export default Filter;
