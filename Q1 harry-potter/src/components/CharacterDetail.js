import React from 'react';

const CharacterDetail = ({ character }) => (
  <div className="character-detail">
    <img src={character.image} alt={character.name} className="character-detail-image" />
    <h2>{character.name}</h2>
    <p>Gender: {character.gender}</p>
    <p>Species: {character.species}</p>
    <p>House: {character.house}</p>
    <p>Birth Year: {character.yearOfBirth}</p>
    <p>Patronus: {character.patronus}</p>
    <p>Ancestry: {character.ancestry}</p>
    <p>Actor: {character.actor}</p>
  </div>
);

export default CharacterDetail;
