import React, {useState} from "react";
import logo from './assets/logo.svg'
import imagem from './assets/pana.svg'
export function NavBar() {
    return <div id="nav">
                <img src={logo} alt="" />
                <ul>
                    <li class="links">Simulação</li>
                    <li class="links">Gráficos</li>
                    <li class="links">Artigos</li>
                    <li class="links">Perfil</li>
                    <li >
                      <div id="hamburguer"v>
                        &#9776;
                      </div>
                    </li>
                </ul>
            </div>;
}
export function ColocarImagem(){
    return  <div>
                <div id="imagem">
                    <img src={imagem}></img>
                </div>
                <div id="texto">
                    <h1>Simule <span>seus investimentos</span> conosco!</h1>
                </div>
            </div>
}
export function Investimentos({nome, texto, imagem}){
    return  <div class="elementos">
                <div class="informacoes">
                    <h1>{nome}</h1>
                    <p>{texto}</p>
                    <button>descubra mais</button>
                </div>
                <img src={imagem} ></img>
            </div>
}
export function TreinarInvestimento(){
    return <div id="infos">
    <div id="titulo">
      <h1>O melhor jeito de <span>treinar</span> o seu <span>investimento</span></h1>
    </div>
    <div id="topicos">
      <ul>
        <li>
          <span>20+</span> 
          <h1>produtos certificados para o investimento</h1>
        </li>
        <li>
          <span>Todas</span> 
          <h1>as taxas para o melhor retorno</h1>
        </li>
        <li>
          <span>PDF</span> 
          <h1>Um pdf do investimento será enviado por email </h1>
        </li>
      </ul>
    </div>
  </div>
}