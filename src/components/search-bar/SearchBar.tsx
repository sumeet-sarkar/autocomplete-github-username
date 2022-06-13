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
  const indexNumber = React.useRef(0);
  const inputElementRef = React.useRef<HTMLInputElement>(null);

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
      indexNumber.current = 0;
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
    indexNumber.current = 0;
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

  function onkeydownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    const acceptableKeys = ['ArrowDown', 'ArrowUp'];
    if (!acceptableKeys.includes(e.code)) {
      return;
    }

    function getUpdatedIndex(keyCode: string, index: number) {
      if (keyCode === 'ArrowDown') {
        index++;
        if (index >= list!.length) {
          index = 0;
        }
      }
      if (keyCode === 'ArrowUp') {      
        index--;
        if (index < 0) {
          index = list!.length - 1
        }
      }
      return index;
    }

    const list = [...results!.items];
    indexNumber.current = getUpdatedIndex(e.code, indexNumber.current);
    if (list![indexNumber.current]) {
      setInput(list![indexNumber.current].login);
    }
  }

  function getSearchResultsElement() {
    if (results?.items.length === 0) {
      return <p className="suggestion-list-no-result">No Results</p>;
    }
    return (
      <ul className="suggestion-list">
        {results?.items.map(result => (
          <SearchResult
            key={result.id}
            imgSrc={result.avatar_url}
            login={result.login}
            htmlURL={result.url}
            searchInput={input}
            onClickAutocomplete={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => fillInputHandler(e, result.login)}
          />
        ))}
      </ul>
    );
  }

  React.useEffect(function() {
    inputElementRef.current?.focus();
  }, [])

  return (
    <div
      className="searchbar-container"
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      onKeyDown={onkeydownHandler}
    >
      <div className="search-bar">
        <img
          src={searchIcon}
          alt="search"
          className="search-icon"
          title="Search"
        />
        <input className="search-bar-input" type="search" value={input} onChange={onChangeHandler} onKeyUp={() => fetchResultsDebounced(input)} ref={inputElementRef} />
      </div>
      {showResults && (
        <div className="searchbar-suggestions">
          {getSearchResultsElement()}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
