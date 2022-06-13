import React from "react";
import searchIcon from "../../assets/search.svg";
import SearchResult from "../search-result/SearchResult";

import "./SearchBar.css";

function SearchBar() {
  const [input, setInput] = React.useState("");
  
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  console.log(input)
  return (
    <div className="searchbar-container">
      <div className="search-bar">
        <img
          src={searchIcon}
          alt="search"
          className="search-icon"
          title="Search"
        />
        <input className="search-bar-input" type="search" value={input} onChange={onChangeHandler}/>
      </div>
      <div className="searchbar-suggestions">
        <ul className="suggestion-list">
          <SearchResult />
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
