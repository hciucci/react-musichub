import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom"; // replaced BrowserRouter with HashRouter
import './css/index.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from './Layout';
import Artists from './pages/Artists';
import Music from "./pages/Music";
import Reviews from './pages/Reviews';
import ContactForm from "./components/ContactForm";

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="artists" element={<Artists />} />
          <Route path="music" element={<Music />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="contact" element={<ContactForm />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

root.render(
  <App />
);