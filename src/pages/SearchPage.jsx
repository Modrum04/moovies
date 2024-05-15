import SearchBar from "../components/SearchBar";
import { useState, useEffect, useRef } from "react";
import { fetchData, useInfiniteScroll } from "../tools/fetchData";
import Card from "../components/Card";
import "./SearchPage.scss";
import Results from "../components/Results";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { fetchedData } = fetchData(
    "search",
    {
      query: searchText,
      page: currentPage,
    },
    searchText,
  );

  const { data, isLoading } = useInfiniteScroll(
    fetchedData,
    searchText,
    currentPage,
    setCurrentPage,
  );

  return (
    <div className="container-searchPage">
      <div className="container-search-menu">
        <SearchBar setSearch={setSearchText} search={searchText} setPage={setCurrentPage} />
      </div>
      {data?.length !== 0 && searchText !== "" && (
        <div className="container-handleChange" key={`${fetchedData?.total_results}`}>
          <p>Nombre de résultats obtenus : {fetchedData?.total_results}</p>
        </div>
      )}
      {searchText === "" && <i className="fi fi-ts-popcorn" />}
      {searchText !== "" && fetchedData.results?.length === 0 && (
        <p>Aucun film ne correspond à votre recherche</p>
      )}
      <Results data={data} fetchedData={fetchedData} isLoading={isLoading} />
    </div>
  );
}
export default SearchPage;
