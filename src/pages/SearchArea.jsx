import { useState } from "react";
import "./SearchPage.scss";
import "./SearchArea.scss";
import Filter from "./Filter";
import SearchPage from "./SearchPage";
import { Link, NavLink, Outlet } from "react-router-dom";

function SearchArea() {
  const [isDiscover, setIsDiscover] = useState(false);

  return (
    <div className="container-search-area">
      <div className="selector-search-system-container">
        <NavLink to="search">
          {/* <button
            className={`${!isDiscover ? "active-tab" : ""}`}
            onClick={() => setIsDiscover(false)}
          > */}
          Rechercher
          {/* </button> */}
        </NavLink>
        <NavLink to="filter">
          {" "}
          {/* <button
            className={`${isDiscover ? "active-tab" : ""}`}
            onClick={() => setIsDiscover(true)}
          > */}
          Découvrir
          {/* </button> */}
        </NavLink>
      </div>
      <div className="separator"></div>
      <Outlet />
      {/* {isDiscover ? <Filter /> : <SearchPage />} */}
    </div>
  );
}

export default SearchArea;
