import { useState } from "react";

function SearchBar({ setSearch, search, setPage }) {
  const [inputText, setInputText] = useState(search);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      setSearch(text);
      setPage(1);
    }, 250);

    setTypingTimeout(newTypingTimeout);
  };

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Cherche ton film"
      />
    </>
  );
}

export default SearchBar;
