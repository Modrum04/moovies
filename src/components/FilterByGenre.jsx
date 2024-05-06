import "./FilterByGenre.scss";
import { fetchData } from "../tools/fetchData";
import PropTypes from "prop-types";

function FilterByGenre({ setGenre }) {
  const { data, isLoading } = fetchData("filter");

  return !isLoading ? (
    <div className="dropdown-menu">
      <i className="fi fi-rr-settings-sliders" />
      <select
        className="FiltreStyle"
        onChange={(event) => {
          setGenre(event.target.value);
        }}
      >
        <option value={[]}>Tous les genres</option>
        {data.genres?.map((genre) => (
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
