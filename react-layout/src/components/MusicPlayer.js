// MusicPlayer.js
import React, { useRef, useEffect } from 'react';

const MusicPlayer = ({ nowPlaying }) => {
    const audioRef = useRef(null);
    const { song = "", artist = "No artist selected" } = nowPlaying || {};

    useEffect(() => {
        const audio = audioRef.current;
        if (song) {
            audio.pause();
            audio.src = song;
            audio.load();
        } else {
            audio.removeAttribute('src');
            audio.load();
        }
    }, [song]);

    return (
        <div id="music-player-section">
            <p id="now-playing-text">Now Playing: {artist}</p>
            <audio ref={audioRef} id="music-player" controls>
                <source src={song} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MusicPlayer;
