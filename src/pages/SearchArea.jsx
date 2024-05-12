import { useState } from "react";
import "./SearchPage.scss";
import "./SearchArea.scss";
import Filter from "./Filter";
import SearchPage from "./SearchPage";

function SearchArea() {
  const [isDiscover, setIsDiscover] = useState(false);

  return (
    <div className="container-search-area">
      <div className="selector-search-system-container">
        <button
          className={`${!isDiscover ? "active-tab" : ""}`}
          onClick={() => setIsDiscover(false)}
        >
          Rechercher
        </button>
        <button className={`${isDiscover ? "active-tab" : ""}`} onClick={() => setIsDiscover(true)}>
          Découvrir
        </button>
      </div>
      <div className="separator"></div>
      {isDiscover ? <Filter /> : <SearchPage />}
    </div>
  );
}

export default SearchArea;
