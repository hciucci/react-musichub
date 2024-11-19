// Artists.js
import React, { useState } from 'react';
import '../css/Artists.css';
import MusicPlayer from '../components/MusicPlayer';

const artistsData = [
    {
        name: "Hugo Dujardin",
        image: "images/HugoDujardin.png",
        bio: "Hugo Dujardin is a talented music producer known for creating uplifting and calm tunes that perfectly blend piano and smooth beats.",
        song: "audio/hugodujardin.mp3",
    },
    {
        name: "Aventure",
        image: "images/AventurePFP.png",
        bio: "With their signature mix of synth and chillwave, Aventure brings an atmospheric experience that captures the essence of serene, modern soundscapes.",
        song: "audio/aventure.mp3",
    },
    {
        name: "Yunior Arronte",
        image: "images/YuniorArronte.png",
        bio: "Known for warm jazzy vibes and soothing piano, Yunior Arronte creates relaxing and intimate soundtracks perfect for cozy evenings.",
        song: "audio/yuniorarronte.mp3",
    },
    {
        name: "Lunar Years",
        image: "images/LunarYears.png",
        bio: "Lunar Years crafts heartfelt folk music, featuring acoustic guitar and calming, unique melodies that resonate with deeply emotional stories.",
        song: "audio/lunaryears.mp3",
    },
];

const Artists = () => {
  const [nowPlaying, setNowPlaying] = useState({ song: "", artist: "No artist selected" });

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

      <MusicPlayer nowPlaying={nowPlaying} />
    </div>
  );
};

export default Artists;