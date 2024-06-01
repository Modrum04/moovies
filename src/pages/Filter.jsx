import "./Filter.scss";
import { useEffect, useState } from "react";
import { fetchData, useInfiniteScroll } from "../tools/fetchData";
import FilterByGenre from "../components/FilterByGenre";
import Results from "../components/Results";
import Sort from "../components/Sort";

function Filter() {
  ////////////////
  const [sortBy, setSortBy] = useState("popularity.dsc");

  /////////////
  const [genre, setGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchedData } = fetchData("discover", {
    sort_by: sortBy,
    page: currentPage,
    with_genres: genre,
  });
  const { data, isLoading } = useInfiniteScroll(fetchedData, genre, currentPage, setCurrentPage);

  return (
    <div className="container-searchPage">
      <div className="container-search-menu">
        <FilterByGenre setGenre={setGenre} setPage={setCurrentPage} />
        <Sort setSort={setSortBy} />
      </div>
      {data?.length !== 0 && (
        <div className="container-handleChange" key={`${fetchedData?.total_results}`}>
          <p>Nombre de résultats obtenus : {fetchedData?.total_results}</p>
        </div>
      )}
      <Results data={data} fetchedData={fetchedData} isLoading={isLoading} type="movie" />
    </div>
  );
}
export default Filter;
