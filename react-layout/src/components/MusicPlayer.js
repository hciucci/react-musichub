// MusicPlayer.js
import React, { useRef } from 'react';

const MusicPlayer = ({ nowPlaying }) => {
    const audioRef = useRef(null);

    // Function to handle play action
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div id="music-player-section">
            <p id="now-playing-text">Now Playing: {nowPlaying.artist}</p>
            <audio ref={audioRef} id="music-player" controls>
                <source src={nowPlaying.song} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={playAudio} style={{ marginTop: '10px' }}>Play</button>
        </div>
    );
};

export default MusicPlayer;
