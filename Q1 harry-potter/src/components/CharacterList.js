import React from 'react';

const CharacterList = ({ characters, onCharacterClick, toggleFavorite, favorites }) => (
  <div className="character-list">
    {characters.map(character => (
      <div 
        key={character.id} 
        className="character-item" 
        onClick={() => onCharacterClick(character)}
      >
        <img src={character.image} alt={character.name} className="character-image" />
        <h3>{character.name}</h3>
        <p>{character.gender}</p>
        <button 
          className={`favorite-button ${favorites.includes(character) ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(character);
          }}
        >
          {favorites.includes(character) ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    ))}
  </div>
);

export default CharacterList;
