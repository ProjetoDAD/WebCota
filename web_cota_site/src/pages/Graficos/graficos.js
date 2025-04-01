import React from "react";
import { Link } from "react-router-dom";

export default function Graficos() {
  return (
    <div>
      <h1>Gráficos</h1>
      <nav>
        <Link to="/artigos">Ir para Artigos</Link> | 
        <Link to="/perfil">Ir para Perfil</Link>
      </nav>
    </div>
  );
}
