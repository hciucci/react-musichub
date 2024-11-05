// Home.js
import React from 'react';
import '../css/index.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <h1>Welcome to MusicHub!</h1>
                <p>A place for discovering, exploring, and sharing your favorite music with a community of like-minded people who also enjoy listening to music.</p>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="features">
                    <div className="feature">
                        <h3>1. Discover New Music</h3>
                        <p>Explore our lists of various artists and music!</p>
                    </div>
                    <div className="feature">
                        <h3>2. Write Reviews</h3>
                        <p>Share your thoughts on your favorite (or least favorite) albums. Connect with other fans and see their reviews!</p>
                    </div>
                    <div className="feature">
                        <h3>3. Contact Us!</h3>
                        <p>Find your way to our "About Us" page to contact us via email!</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
