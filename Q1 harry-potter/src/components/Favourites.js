import React from 'react';

const Favorites = ({ favorites, onCharacterClick }) => {
  return (
    <div className="favorites-list">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map(character => (
          <div 
            key={character.id} 
            className="character-item" 
            onClick={() => onCharacterClick(character)}
          >
            <img 
              src={character.image} 
              alt={character.name} 
              className="character-image"
            />
            <h3 className="character-name">{character.name}</h3>
            <p className="character-gender">{character.gender}</p>
          </div>
        ))
      ) : (
        <p>No favorites selected.</p>
      )}
    </div>
  );
};

export default Favorites;
