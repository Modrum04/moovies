import { useEffect, useState } from "react";
import "./SearchBar.scss";

function SearchBar({ setSearch, search, setPage }) {
  const [inputText, setInputText] = useState(search);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const localValue = sessionStorage.getItem("search", JSON.stringify(search));

    if (localValue && localValue.search !== "") {
      setInputText(localValue);
      setSearch(localValue);
      setPage(1);
    }
  }, []);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setPage(1);
    window.scroll(0, 0);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      setSearch(text);
    }, 500);

    setTypingTimeout(newTypingTimeout);

    if (text === "") {
      sessionStorage.removeItem("search");
      setPage(0);
    }

    text !== "" && sessionStorage.setItem("search", text);
  };

  return (
    <>
      <input
        className="search-bar"
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Cherche ton film"
      />
    </>
  );
}

export default SearchBar;
