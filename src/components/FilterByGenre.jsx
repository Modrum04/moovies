import "./FilterByGenre.scss";
import { useContext, useState, useEffect } from "react";
import { GenreContext } from "../contexts/GenreContext";

function FilterByGenre({ setGenre, setPage }) {
  const { fetchedGenre } = useContext(GenreContext);
  const [changeTimeout, setChangeTimeout] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const lastSelected = JSON.parse(sessionStorage.getItem("SELECT_GENRE_KEY") ?? "[]");
    setSelected(lastSelected);
    setGenre(lastSelected);
    setPage(1);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;

    window.scroll(0, 0);
    if (changeTimeout) {
      clearTimeout(changeTimeout);
    }

    const newChangeTimeout = setTimeout(() => {
      setGenre(value);
      setPage(1);
    }, 250);

    setChangeTimeout(newChangeTimeout);
    sessionStorage.setItem("SELECT_GENRE_KEY", JSON.stringify(value));
    setSelected(value);
  };

  return (
    <div className="dropdown-menu">
      <i className="fi fi-rr-settings-sliders" />
      <select className="FiltreStyle" onChange={handleInputChange} value={selected}>
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
