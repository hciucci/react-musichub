// Music.js
import React from 'react';
import '../css/Music.css';
import tracksData from '../jsonmusic/music-data.json';

const Music = () => {
  return (
    <div className="music-page">
      <h2>Featured Music</h2>
      <div className="music-grid">
        {tracksData.music.map((track) => (
          <div key={track._id} className="music-item">
            <img src={track.image} alt={track.title} />
            <h3>{track.title}</h3>
            <p><strong>Artist:</strong> {track.artist}</p>
            <p><strong>Duration:</strong> {track.duration}</p>
            <p>{track.description}</p>
            <div className="genres">
              {track.genres.map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
