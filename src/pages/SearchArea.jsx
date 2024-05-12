import SearchBar from "../components/SearchBar";
import { useState, useEffect, useRef } from "react";
import { fetchData, useInfiniteScroll } from "../tools/fetchData";

import Card from "../components/Card";
import "./SearchPage.scss";
import "./SearchArea.scss";
import FilterByGenre from "../components/FilterByGenre";
import Filter from "./Filter";
import SearchPage from "./SearchPage";
import Results from "../components/Results";

function SearchArea() {
  const [isDiscover, setIsDiscover] = useState(false);

  function changingMode() {
    if (!isDiscover) {
      setIsDiscover(true);
    } else {
      setIsDiscover(false);
    }
  }
  return (
    <div className="container-searchPage">
      <button onClick={changingMode}>Change Mode</button>
      <div className="selector-search-system-container">
        <div className={`${!isDiscover ? "active-tab" : ""}`} onClick={changingMode}>
          Search
        </div>
        <div className={`${isDiscover ? "active-tab" : ""}`} onClick={changingMode}>
          Discover
        </div>
      </div>
      <div className="separator"></div>
      {isDiscover ? <Filter /> : <SearchPage />}
    </div>
  );
}

export default SearchArea;
