import { useState, useEffect } from 'react'

// useEffect to make a request to the Rick and Morty API when the component mounts
const useCharacters = url => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  }, [url]);
  return characters;
};

export default useCharacters;