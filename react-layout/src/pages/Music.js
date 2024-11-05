// src/pages/Music.js
import React, { useEffect, useState } from 'react';
import MusicPlayer from '../components/MusicPlayer'; // Import the MusicPlayer component
import './Music.css'; // Assuming you have a CSS file for styling

const Music = () => {
    const [musicData, setMusicData] = useState([]);
    const [nowPlaying, setNowPlaying] = useState({ song: "", artist: "" });

    // Fetch music data on component mount
    useEffect(() => {
        fetch('music-data.json')
            .then(response => response.json())
            .then(data => {
                setMusicData(data.music);
            })
            .catch(error => console.error('Error fetching the data:', error));
    }, []);

    // Function to handle "Listen Now" button clicks
    const handleListenNow = (song, artist) => {
        setNowPlaying({ song, artist });
        document.getElementById('music-player-section').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="music-page">
            <h2>Music</h2>
            <ul id="music-list">
                {musicData.map((music, index) => (
                    <li key={index} className="music-item">
                        <img src={music.image} alt={music.title} />
                        <div className="music-info">
                            <h3>Song Title: "{music.title}"</h3>
                            <p><strong>Artist:</strong> {music.artist}</p>
                            <p><strong>Duration:</strong> {music.duration}</p>
                            <p><strong>Description:</strong> {music.description}</p>
                            <p><strong>Genres:</strong> 
                                <ul>
                                    {music.genres?.map((genre, i) => (
                                        <li key={i}>{genre}</li>
                                    ))}
                                </ul>
                            </p>
                            <button
                                className="listen-now"
                                onClick={() => handleListenNow(music.song, music.artist)}
                                data-song={music.song}
                                data-artist={music.artist}
                            >
                                Listen Now
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <MusicPlayer nowPlaying={nowPlaying} />
        </div>
    );
};

export default Music;
