import React, {useState} from "react";
import logo from './assets/logo.svg'
import twitter from './assets/Twitter.svg'
import facebook from './assets/facebook.svg'
import linkedin from './assets/linkedin.svg'
import logo_preta from './assets/logo_preta.svg'
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
export function ColocarImagem({imagem, texto}){
  
    return  <div>
                <div id="imagem">
                    <img src={imagem}></img>
                </div>
                <div id="texto">
                    <h1>{texto}!</h1>
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
export function SimularInvestimento() {
  return <div id="formsSimulacao">
      <div id="formulario">
        <form>
          <div id="tipoInvest">
            <ul>
              <li>
                <input type="radio" name="tipoInvest" value="LCI/LCA" />
                <label id="opcao1"><a href="#opcao1">LCI/LCA</a></label>
              </li>
              <li>
                <input type="radio" name="tipoInvest" value="CDB" />
                <label id="opcao2"><a href="#opcao2">CDB</a></label>
              </li>
              <li>
                <input type="radio" name="tipoInvest" value="Tesouro Direto" />
                <label id="opcao3"><a href="#opcao3">Tesouro Direto</a></label>
              </li>
            </ul>
          
          </div>
          <div id="inputs">
            <label htmlFor="investir">Quanto gostaria de investir?</label> 
            <input type="number" id="investir" name="investir" />

            <label htmlFor="deposito">Quanto gostaria de depositar por mês?</label> 
            <input type="number" id="deposito" name="deposito" />

            <label htmlFor="tempo">Por quanto tempo deixaria o dinheiro investido?</label> 
            <input type="number" id="tempo" name="tempo" />

            <input type="submit" value="Simular" />
          </div>
        </form>
      </div>
      <div id="gerarPdf">
        <h1>Seu PDF</h1>
      </div>
    </div>
}

export function InvestimentoLongoPrazo(){
  return <div class="produtos">
  <div class="barra">
    <h2>CDB - Certificado de Depósito Bancário</h2>
    <div class="barra-exterior">
      <div class="barra-interior"></div>
      <p>90/100</p>
    </div>
  </div>
  <div class="text-card">
    <h3>Title</h3>
    <p>Please add your content here. Keep it short and simple. And smile.
      Please add your content here. Keep it short and simple. And smile.
    </p>
  </div>
</div>
}

export function Rodape(){
  return <div class="rodape">
    <h2>Faça parte agora do nosso Projeto</h2>
    <p>WebCota o melhor treino para o sucesso no investimento</p>
    <div class="rodape-buttons">
      <button class="outline">Doação</button>
      <button class="solid">Cadastrar</button>
    </div>
  </div>
}

export function Footer(){
  return  <footer>
            <div class="footer-content">
              <div class="footer-column">
                <h3>NAVEGAÇÃO</h3>
                <ul>
                  <li>About Us</li>
                  <li>What We Do</li>
                  <li>Home</li>
                  <li>To The Power of 10</li>
                  <li>Donate</li>
                </ul>
              </div>
              <div class="footer-column">
                <h3>O QUE NÓS FAZEMOS</h3>
                <ul>
                  <li>Encouraging Testing</li>
                  <li>Strengthening Advocacy</li>
                  <li>Sharing Information</li>
                  <li>Building Leadership</li>
                  <li>Engaging With Global Fund</li>
                  <li>Shining a Light</li>
                </ul>
              </div>
              <div class="footer-column">
                <h3>LEGALIDADE</h3>
                <ul>
                  <li>General Info</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              <div class="footer-column">
                <h3>FALE CONOSCO</h3>
                <ul>
                  <li>projetoDAD99@gmail.com</li>
                  <li>+11 4002-8922</li>
                  <li>Nós contacte</li>
                  <li>Suporte</li>
                  <li>LinkedIn</li>
                  <li>Twitter</li>
                </ul>
              </div>
            </div>
            <div class="footer-bottom">
              <div class="logo">
                <img class="imagem-contatos" src={logo_preta} alt="WebCota"/>
                
              </div>
              <p>© 2025 WebCota Media. All Rights Reserved.</p>
              <div class="social-icons">
                  <a href="#"><img class="imagem-contatos" src={facebook} alt="Facebook"/></a>
                  <a href="#"><img class="imagem-contatos" src={linkedin} alt="LinkedIn"/></a>
                  <a href="#"><img class="imagem-contatos" src={twitter}  alt="Twitter"/></a>
              </div>
            </div>
          </footer>
}