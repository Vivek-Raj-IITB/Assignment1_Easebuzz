import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You have selected ${result}!`)}
    >
      {result}
    </div>
  );
};