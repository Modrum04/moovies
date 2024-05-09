import { useState } from "react";
import "./SearchBar.scss";

function SearchBar({ setSearch, search, setPage }) {
  const [inputText, setInputText] = useState(search);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    window.scroll(0, 0);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      setSearch(text);
      setPage(1);
    }, 500);

    setTypingTimeout(newTypingTimeout);
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
