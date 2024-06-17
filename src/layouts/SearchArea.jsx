import "./SearchPage.scss";
import "./SearchArea.scss";
import { NavLink, Outlet } from "react-router-dom";

function SearchArea() {
  return (
    <div className="container-search-area">
      <div className="selector-search-system-container">
        <NavLink to="search">Rechercher</NavLink>
        <NavLink to="filter">Découvrir</NavLink>
      </div>
      <div className="separator"></div>
      <Outlet />
    </div>
  );
}

export default SearchArea;
