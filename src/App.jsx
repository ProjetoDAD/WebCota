import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/home";
import Graficos from "./pages/Graficos/graficos";
import Perfil from "./pages/Perfil/Perfil";
import NavBar from "./components/Navbar/navbar";
import Cadastro from "./pages/Perfil/Cadastro";
import Login from './pages/Perfil/Login'
import Logout from "./pages/Perfil/Logout";

function Layout() {
  const location = useLocation();
  const hideNavbarPages = ["/cadastro", "/login"];

  return (
      <>
        {!hideNavbarPages.some((path) => location.pathname.startsWith(path)) && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graficos" element={<Graficos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </>
  );
  
}
  
export function App() {
  return(
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  )
}

