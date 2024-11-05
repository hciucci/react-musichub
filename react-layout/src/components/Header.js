// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/" className="logo">MusicHub</Link>

                <div id="menuToggle" onClick={toggleMenu} className={menuOpen ? 'open' : ''}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/artists" onClick={() => setMenuOpen(false)}>Artists</Link></li>
                    <li><Link to="/music" onClick={() => setMenuOpen(false)}>Music</Link></li>
                    <li><Link to="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link></li>
                    <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
