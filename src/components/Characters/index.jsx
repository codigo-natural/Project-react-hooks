import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react'
import useCharacters from '../../hooks/useCharacters';
import Search from '../Search';
import { FcSearch } from 'react-icons/fc'
import './styles.css'
// Initialize state to allow favorites to be tracked
const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/';

// Reducer used with useReducer to add/remove user favorites
const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}

// Main component
const Characters = () => {
  // useReducer allows us to manage different states (favorites in this instance) and dispatch changes to that state with an action object
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  // useState to store the search value of a character
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API);


  // use the dispatch function from useReducer to add a character to our favorites state
  const handleClick = favorite => {
    dispatch({ type: 'ADD_FAVORITE', payload: favorite });
  }

  // Update the search value with useState
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // }

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })

  // useMemo is used to optimize confusing code and improve performance of components
  const filteredUsers = useMemo(() =>
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }),
    [characters, search]
  )

  return (
    <div className='Characters'>
      {/* loop through favorites in state and display them on screen */}
      {favorites.favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}

      <div className="search-bar">
        <button>
          <FcSearch />
        </button>
        <Search
          search={search}
          searchInput={searchInput}
          handleSearch={handleSearch}
        />
      </div>

      <div className="container">
        {filteredUsers.map(character => (
          <div className="card" key={character.id}>
            <figure>
              <img src={character.image} alt="" />
            </figure>
            <h2>{character.name}</h2>
            <aside>
              <div className="description">
                <p><span>Status: </span>{character.status}</p>
                <p><span>Specie: </span>{character.species}</p>
              </div>
              <button
                type='button'
                onClick={() => handleClick(character)}>
                Agregar a Favoritos
              </button>
            </aside>
            {/* click handler to add user favorites to state */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Characters;