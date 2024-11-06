import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/index.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from './Layout';
import Artists from './pages/Artists';
import Music from "./pages/Music";
import Reviews from './pages/Reviews';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <BrowserRouter basename={ProcessingInstruction.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="artists" element={<Artists />} />
          <Route path="music" element={<Music />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <App />
);
