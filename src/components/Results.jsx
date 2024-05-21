import Card from "../components/Card";
import "./Results.scss";

function Results({ data, fetchedData, isLoading }) {
  return (
    <>
      {data &&
        data?.map((objResults, i) => (
          <div className="results-container" key={`data-${objResults.page}-${i}`}>
            <h4 className={`page-start-${objResults.page}`}>
              Page : {objResults.page} sur {objResults.total_pages} -{" "}
              <em>{objResults.results?.length} résultats</em>
            </h4>
            <div className="grid-container-cards">
              {objResults?.results?.map((movie, i) => {
                movie.resultNumb = i + 1 + (objResults.page - 1) * 20;
                return (
                  <Card
                    key={movie.id}
                    originalTitle={movie?.original_title}
                    date={movie?.release_date}
                    poster={movie?.poster_path}
                    overview={movie?.overview}
                    voteAverage={movie?.vote_average}
                    filmid={movie?.id}
                    title={movie?.title}
                    genres={movie?.genre_ids}
                    resultNumber={movie?.resultNumb + " sur " + fetchedData?.total_results}
                  />
                );
              })}{" "}
            </div>
          </div>
        ))}
      <div className="observer" style={{ minHeight: "10dvh", backgroundColor: "blue" }}>
        {isLoading && <h1>En chargement...</h1>}
      </div>
    </>
  );
}

export default Results;
