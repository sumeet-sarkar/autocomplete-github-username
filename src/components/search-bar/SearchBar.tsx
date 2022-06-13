import React from "react";
import { getUsers, IUser } from "../../api/getUsers";
import searchIcon from "../../assets/search.svg";
import debounce from "../../utils/debounce";
import SearchResult from "../search-result/SearchResult";

import "./SearchBar.css";

function SearchBar() {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState<IUser | null>(null);
  const [showResults, setShowResults] = React.useState(false);

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
  const fetchResultsDebounced = React.useCallback(
    debounce(fetchResults, 1000),
    []
  );

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    fetchResultsDebounced(e.target.value);
  }

  function onFocusHandler(e: React.FocusEvent<HTMLDivElement, Element>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowResults(true);
      fetchResults(input);
    }
  }

  function onBlurHandler(e: React.FocusEvent<HTMLDivElement, Element>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowResults(false);
    }
  }

  function fillInputHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    login: string
  ) {
    e.preventDefault();
    fetchResults(login);
    setInput(login);
  }

  return (
    <div
      className="searchbar-container"
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
    >
      <div className="search-bar">
        <img
          src={searchIcon}
          alt="search"
          className="search-icon"
          title="Search"
        />
        <input className="search-bar-input" type="search" value={input} onChange={onChangeHandler}/>
      </div>
      {showResults && (
        <div className="searchbar-suggestions">
          <ul className="suggestion-list">
          {results?.items.map(result => (
            <SearchResult
              key={result.id}
              imgSrc={result.avatar_url}
              login={result.login}
              htmlURL={result.html_url}
              onClickAutocomplete={(
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => fillInputHandler(e, result.login)}
            />
          ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
