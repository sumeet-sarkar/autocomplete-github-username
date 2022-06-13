import noImage from "../../assets/no-image.png";
import "./SearchResult.css";

interface ISearchResultProps {
  imgSrc: string;
  login: string;
  htmlURL: string;
  onClickAutocomplete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function SearchResult({
  imgSrc,
  login,
  htmlURL,
  onClickAutocomplete,
}: ISearchResultProps) {
  return (
    <li className="suggestion-item">
      <a href={htmlURL} className="suggestion-item-container">
        <div className="suggestion-item-img">
          <object data={noImage} type="image/png/jpeg">
            <img src={imgSrc} alt="avatar" height="40" width="40" />
          </object>
        </div>
        <div className="suggestion-item-body">
          <div className="suggestion-item-body-title">{login}</div>
          <div className="suggestion-item-body-description">Information</div>
        </div>
        <div className="suggestion-item-action">
          <button
            type="button"
            title="Select"
            className="suggestion-item-action-button"
            onClick={onClickAutocomplete}
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
            </svg>
          </button>
        </div>
      </a>
    </li>
  );
}

export default SearchResult;
