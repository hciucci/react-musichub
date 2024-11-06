// MusicPlayer.js
import React from 'react';

const MusicPlayer = ({ nowPlaying }) => {
    return (
        <div id="music-player-section">
            <p id="now-playing-text">Now Playing: {nowPlaying.artist}</p>
            <audio id="music-player" controls>
                <source src={nowPlaying.song} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MusicPlayer;