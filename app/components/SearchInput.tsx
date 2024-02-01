import React, { useState } from 'react';

const SearchBar = ({ onSearch } :any) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e:any) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleSearch = (e:any) => {
    if (e.key === 'Enter') {
        onSearch(searchTerm);
      }
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite sua pesquisa"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default SearchBar;