import React from "react";
import { getUsers, IUser } from "../../api/getUsers";
import searchIcon from "../../assets/search.svg";
import SearchResult from "../search-result/SearchResult";

import "./SearchBar.css";

function SearchBar() {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState<IUser | null>(null);

  const fetchResults = async (input: string) => {
    if (input === "") {
      setResults(null);
      return;
    }
    try {
      const res = await getUsers(input);
      const newResults = { ...(res.data as IUser) };
      newResults.items = newResults.items.slice(0, 5);
      setResults(newResults);
    } catch (err) {
      console.error("can not fetch users. ", err);
    }
  };

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    fetchResults(e.target.value);
  }

  function fillInputHandler(login: string) {
    fetchResults(login);
    setInput(login);
  }

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
        {results?.items.map(result => (
          <SearchResult
            key={result.id}
            imgSrc={result.avatar_url}
            login={result.login}
            onClickAutocomplete={() => fillInputHandler(result.login)}
          />
        ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
