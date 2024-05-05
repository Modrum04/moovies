import { useState, useEffect, useContext } from "react";
import { fetchData } from "../tools/fetchData";
import "./SearchBar.scss";
import { ThemeContext } from "../contexts/ThemeContext";
import Card from "./Card";

function SearchBar() {
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = fetchData("search", {
    query: searchText,
    page: currentPage,
  });

  const handlePrevious = () => {
    setCurrentPage((prev) => {
      const prevPage = prev < data?.total_pages ? prev - 1 : prev;
      if (prevPage !== prev) {
        window.scrollTo(0, 0);
      }
      return prevPage;
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      const nextPage = prev < data?.total_pages ? prev + 1 : prev;
      if (nextPage !== prev) {
        window.scrollTo(0, 0);
      }
      return nextPage;
    });
  };

  return (
    <div className="container-searchBar">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Cherche ton film"
      />
      {data.results?.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <p>
            Page {currentPage} sur {data?.total_pages}
          </p>
        </div>
      )}
      {searchText === "" && <i className="fi fi-ts-popcorn" />}
      {searchText !== "" && data.results?.length === 0 && (
        <p>Désolé, aucun film ne correspond à ta recherche</p>
      )}
      <div className="grid-container-cards">
        {data.results?.length > 0 &&
          searchText !== "" &&
          data.results?.map((movie) => (
            <Card
              key={movie.id}
              originalTitle={movie?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              overview={movie?.overview}
              voteAverage={movie?.vote_average}
              filmid={movie?.id}
              title={movie?.title}
            />
          ))}
      </div>

      {data.results?.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <div className="container-btn">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={theme}
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === data?.total_pages}
              className={theme}
            >
              Suivant
            </button>
          </div>
          <p>
            Page {currentPage} sur {data?.total_pages}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
