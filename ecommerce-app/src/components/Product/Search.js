import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  // Handles the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = keyword.trim();
    history.push(query ? `/products/${query}` : "/products");
  };

  return (
    <Fragment>
      <MetaData title="Search a Product" />
      <form className="searchBox" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search a Product..."
          aria-label="Search Products"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" aria-label="Submit Search">
          Search
        </button>
      </form>
    </Fragment>
  );
};

export default Search;
