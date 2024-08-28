import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterDetail from './components/CharacterDetail';

import Favorites from './components/Favourites';
import CharacterList from './components/CharacterList';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ gender: '', species: '', house: '' });
  const [sortCriteria, setSortCriteria] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    axios.get('https://hp-api.herokuapp.com/api/characters')
      .then(response => setCharacters(response.data))
      .catch(err => setError('Failed to fetch characters'));
  }, []);

  const toggleFavorite = (character) => {
    if (favorites.includes(character)) {
      setFavorites(favorites.filter(fav => fav !== character));
    } else {
      setFavorites([...favorites, character]);
    }
  };

  const filteredAndSortedCharacters = characters
    .filter(character =>
      character.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter.gender ? character.gender === filter.gender : true) &&
      (filter.species ? character.species === filter.species : true) &&
      (filter.house ? character.house === filter.house : true)
    )
    .sort((a, b) => {
      if (sortCriteria === 'name') return a.name.localeCompare(b.name);
      if (sortCriteria === 'gender') return a.gender.localeCompare(b.gender);
      if (sortCriteria === 'species') return a.species.localeCompare(b.species);
      return 0;
    })
    .slice(0, visibleCount);

  const showMoreCharacters = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app-container">
      <input 
        type="text" 
        placeholder="Search by name" 
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />

      <div className="filters">
        <select onChange={(e) => setFilter({ ...filter, gender: e.target.value })}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select onChange={(e) => setFilter({ ...filter, species: e.target.value })}>
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="half-giant">Half-Giant</option>
          <option value="werewolf">Werewolf</option>
        </select>

        <select onChange={(e) => setFilter({ ...filter, house: e.target.value })}>
          <option value="">All Houses</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
        </select>
      </div>

      <button onClick={() => setShowFavorites(!showFavorites)} className="show-favorites-button">
        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
      </button>

      {showFavorites && (
        <div className="favorites-container">
          <Favorites 
            favorites={favorites} 
            onCharacterClick={setSelectedCharacter} 
          />
        </div>
      )}

      <div className="content-container">
        <div className="character-list-container">
          <CharacterList 
            characters={filteredAndSortedCharacters} 
            onCharacterClick={setSelectedCharacter} 
            toggleFavorite={toggleFavorite} 
            favorites={favorites} 
          />
          {visibleCount < characters.length && (
            <button onClick={showMoreCharacters} className="show-more-button">Show More</button>
          )}
        </div>

        

        {selectedCharacter && (
          <div className="character-detail-container">
            <CharacterDetail character={selectedCharacter} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
