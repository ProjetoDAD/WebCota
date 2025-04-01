import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/home";
import Graficos from "./pages/Graficos/graficos";
import Artigos from "./pages/Artigos/artigos";
import Perfil from "./pages/Perfil/perfil";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/artigos" element={<Artigos />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

