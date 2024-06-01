import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import "./SearchPage.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigateTo = useNavigate();
  useEffect(() => navigateTo("search-movie"), []);

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
