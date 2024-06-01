import SearchBar from "../components/SearchBar";
import { useState } from "react";
import "./SearchPage.scss";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="container-searchPage">
      <div className="container-search-menu">
        <SearchBar setSearch={setSearchText} search={searchText} setPage={setCurrentPage} />{" "}
        <div className="selector-search-system-container">
          <NavLink to="search-movie">Films</NavLink>
          <NavLink to="search-person">Personnes</NavLink>
        </div>
      </div>{" "}
      <Outlet context={{ searchText, currentPage, setCurrentPage }} />
    </div>
  );
}
export default SearchPage;
