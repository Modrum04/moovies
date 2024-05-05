import "./Filter.scss";
import { useState } from "react";
import { fetchData } from "../tools/fetchData";
import FilterByGenre from "../components/FilterByGenre";
import Card from "../components/Card";

function Filter() {
  const [genre, setGenre] = useState([]);
  const [pages, setPages] = useState(1);
  const { data, isLoading } = fetchData("discover", {
    sort_by: "popularity.dsc",
    page: pages,
    with_genres: genre,
  });

  const total = 500;

  return (
    <>
      <div className="global-filter">
        {pages > 1 && (
          <button className="butbut-previous" type="button" onClick={() => setPages(pages - 1)}>
            Précédent
          </button>
        )}

        <FilterByGenre setGenre={setGenre} />
        {pages < total && (
          <button className="butbut-next" type="button" onClick={() => setPages(pages + 1)}>
            Suivant
          </button>
        )}
      </div>
      <div className="filter-card-container">
        {data.results &&
          data.results.map((film) => (
            <Card
              key={film.id}
              originalTitle={film?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              overview={film.overview}
              voteAverage={film.vote_average}
              filmid={film.id}
              title={film.title}
            />
          ))}
      </div>
    </>
  );
}
export default Filter;
