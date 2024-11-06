// src/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './css/Layout.css';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="main-container">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
