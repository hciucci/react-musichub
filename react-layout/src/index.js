import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/index.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from './Layout';
import Artists from './pages/Artists';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="artists" element={<Artists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <App />
);
