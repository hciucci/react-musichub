// src/pages/Artists.js
import React, { useState } from 'react';
import '../css/Artists.css'; // Create an Artists.css file for styling

const artistsData = [
    {
        name: "Hugo Dujardin",
        image: "images/HugoDujardin.png",
        bio: "Hugo Dujardin is a talented music producer known for creating uplifting and calm tunes that perfectly blend piano and smooth beats.",
        song: "/audio/hugodujardin.mp3",
    },
    {
        name: "Aventure",
        image: "images/AventurePFP.png",
        bio: "With their signature mix of synth and chillwave, Aventure brings an atmospheric experience that captures the essence of serene, modern soundscapes.",
        song: "/audio/aventure.mp3",
    },
    {
        name: "Yunior Arronte",
        image: "images/YuniorArronte.png",
        bio: "Known for warm jazzy vibes and soothing piano, Yunior Arronte creates relaxing and intimate soundtracks perfect for cozy evenings.",
        song: "/audio/yuniorarronte.mp3",
    },
    {
        name: "Lunar Years",
        image: "images/LunarYears.png",
        bio: "Lunar Years crafts heartfelt folk music, featuring acoustic guitar and calming, unique melodies that resonate with deeply emotional stories.",
        song: "/audio/lunaryears.mp3",
    },
];

const Artists = () => {
    const [nowPlaying, setNowPlaying] = useState({ song: "", artist: "Select an artist to listen to their music" });

    const handlePlay = (song, artist) => {
        setNowPlaying({ song, artist });
    };

    return (
        <div className="artists-page">
            <h2>Top Rated Artists</h2>
            <div className="artist-grid">
                {artistsData.map((artist, index) => (
                    <div key={index} className="artist-item">
                        <img src={artist.image} alt={artist.name} />
                        <p>{artist.name}</p>
                        <p className="artist-bio">{artist.bio}</p>
                        <button className="listen-now" onClick={() => handlePlay(artist.song, artist.name)}>
                            Listen Now!
                        </button>
                    </div>
                ))}
            </div>

            <section id="music-player-section">
    <h2>Now Playing</h2>
    <div id="music-player-container">
        <audio id="music-player" controls src={nowPlaying.song}>
            Your browser does not support the audio element.
        </audio>
        <p id="now-playing-text">{nowPlaying.artist}</p>
    </div>
</section>
        </div>
    );
};

export default Artists;
