import "./FilterByGenre.scss";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { GenreContext } from "../contexts/GenreContext";

function FilterByGenre({ setGenre, setPage }) {
  const { fetchedGenre } = useContext(GenreContext);
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

  return (
    <div className="dropdown-menu">
      <i className="fi fi-rr-settings-sliders" />
      <select
        className="FiltreStyle"
        onChange={(e) => {
          handleInputChange(e);
          console.log("déclencheur composant");
        }}
      >
        <option value={""}>Tous les genres</option>
        {fetchedGenre?.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default FilterByGenre;

FilterByGenre.propTypes = {
  setGenre: PropTypes.func.isRequired,
};
