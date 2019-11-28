import React, {useState} from 'react';
import './style.css';

function Search({search}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = ({target}) => {
    setSearchValue(target.value);
  };

  const resetInputSearch = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    search(searchValue);
    resetInputSearch();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInput}
        type="text"/>
      <button
        type="submit"
        value="SEARCH"
        onClick={callSearchFunction}>Поиск</button>
    </form>
  );
}

export default Search;
