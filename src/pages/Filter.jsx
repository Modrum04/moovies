import "./Filter.scss";
import { useState } from "react";
import { fetchData, useInfiniteScroll } from "../tools/fetchData";
import FilterByGenre from "../components/FilterByGenre";
import Results from "../components/Results";

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
    <div className="container-searchPage">
      <div className="global-filter">
        <FilterByGenre setGenre={setGenre} setPage={setCurrentPage} />
      </div>
      <Results data={data} fetchedData={fetchedData} isLoading={isLoading} />
    </div>
  );
}
export default Filter;
