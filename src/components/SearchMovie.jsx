import SearchBar from "./SearchBar";
import { useState, useEffect, useRef } from "react";
import { fetchData, useInfiniteScroll } from "../tools/fetchData";
import Card from "./Card";
import "../pages/SearchPage.scss";
import Results from "./Results";
import Sort from "./Sort";
import { useOutletContext } from "react-router-dom";

function SearchMovie() {
  const { searchText, currentPage, setCurrentPage } = useOutletContext();
  const { fetchedData } = fetchData(
    "searchMoovie",
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
    <>
      {data?.length !== 0 && searchText !== "" && (
        <div className="container-handleChange" key={`${fetchedData?.total_results}`}>
          <p>Nombre de résultats obtenus : {fetchedData?.total_results}</p>
        </div>
      )}
      {searchText === "" && <i className="fi fi-ts-popcorn" />}
      {searchText !== "" && fetchedData.results?.length === 0 && (
        <p>Aucun film ne correspond à votre recherche</p>
      )}
      <Results data={data} fetchedData={fetchedData} isLoading={isLoading} type="movie" />
    </>
  );
}
export default SearchMovie;
