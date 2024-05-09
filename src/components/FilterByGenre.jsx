import "./FilterByGenre.scss";
import { useState } from "react";
import { fetchData } from "../tools/fetchData";
import PropTypes from "prop-types";

function FilterByGenre({ setGenre, setPage }) {
  const { fetchedData, isLoading } = fetchData("filter");
  const [changeTimeout, setChangeTimeout] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;

    window.scroll(0, 0);
    if (changeTimeout) {
      clearTimeout(changeTimeout);
    }

    const newChangeTimeout = setTimeout(() => {
      setGenre(value);
      setPage(1);
    }, 500);

    setChangeTimeout(newChangeTimeout);
  };

  return !isLoading ? (
    <div className="dropdown-menu">
      <i className="fi fi-rr-settings-sliders" />
      <select className="FiltreStyle" onChange={handleInputChange}>
        <option value={[]}>Tous les genres</option>
        {fetchedData.genres?.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <p>En cours de chargement...</p>
  );
}
export default FilterByGenre;

FilterByGenre.propTypes = {
  setGenre: PropTypes.func.isRequired,
};
