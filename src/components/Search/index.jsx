import React from 'react'

/* search input to filter characters from the list  */ 
const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className='Search'>
      <input
        type='text'
        value={search}
        ref={searchInput}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search