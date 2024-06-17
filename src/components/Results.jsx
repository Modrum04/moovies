import Card from "../components/Card";
import PersonCard from "./PersonCard";
import "./Results.scss";

function Results({ data, fetchedData, isLoading, type }) {
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
              {type === "movie" &&
                objResults?.results?.map((movie, i) => {
                  movie.resultNumb = i + 1 + (objResults.page - 1) * 20;
                  return (
                    <Card
                      key={movie.id}
                      movie={movie}
                      resultNumber={movie?.resultNumb + " sur " + fetchedData?.total_results}
                    />
                  );
                })}{" "}
              {type === "person" &&
                objResults?.results?.map((person, i) => {
                  person.resultNumb = i + 1 + (objResults.page - 1) * 20;
                  return <PersonCard key={person.id} person={person} type="person" />;
                })}{" "}
            </div>
          </div>
        ))}

      <div className="observer" style={{ minHeight: "10dvh" }}>
        {isLoading && <h1>En chargement...</h1>}
      </div>
    </>
  );
}

export default Results;
