import "./FilterByGenre.scss";
import { useState, useEffect } from "react";
import { sortTypes } from "../lib/sortTypes";

function Sort({ setSort, setPage }) {
  const [changeTimeout, setChangeTimeout] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const lastSelected = JSON.parse(sessionStorage.getItem("SELECT_SORT_KEY") ?? "[]");
    setSelected(lastSelected);
    setSort(lastSelected);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;

    window.scroll(0, 0);
    if (changeTimeout) {
      clearTimeout(changeTimeout);
    }

    const newChangeTimeout = setTimeout(() => {
      setSort(value);
      setPage(1);
    }, 250);

    setChangeTimeout(newChangeTimeout);
    sessionStorage.setItem("SELECT_SORT_KEY", JSON.stringify(value));
    setSelected(value);
  };

  return (
    <div className="dropdown-menu">
      <i className="fi fi-rr-settings-sliders" />
      <select className="FiltreStyle" onChange={handleInputChange} value={selected}>
        <option value={""}>Trier par</option>
        {sortTypes.map((sort) => (
          <option key={sort.id} value={sort.query}>
            {sort.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Sort;
