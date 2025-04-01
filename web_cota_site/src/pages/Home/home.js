import React from "react";
import imagem from "../../assets/pana.svg"
import logo from '../../assets/logo.svg'
import Navbar from "../../components/Navbar/navbar"
import Footer from "../../components/Footer/footer"
import nfts from '../../assets/nfts.svg'
import efts from '../../assets/efts.svg'
import acoes from '../../assets/acoes.svg'
import "../../components/Navbar/navbar.css"
import "../../components/Footer/footer.css"
import "./invistaSeuJeito.css"
import "./index.css"
import "./produtosRendaFixa.css"
import "./treinarInvestimentos.css"

function ColocarImagem({imagem, texto}){
  
    return(
            <section id="imagemTexto">
                <div>
                <div id="imagem">
                    <img src={imagem}></img>
                </div>
                <div id="texto">
                    <h1>{texto}!</h1>
                </div>
            </div>
            </section> 
        );
}

function Card({nome, texto, imagem}) {
    return(
        <div class="elementos">
            <div class="informacoes">
                <h1>{nome}</h1>
                <p>{texto}</p>
                <button>descubra mais</button>
            </div>
            <img src={imagem} ></img>
        </div>
    );
}
function Investimentos({nome, texto, imagem}){
    return (
    <section id="invistaSeuJeito">
      <h1>Invista do Seu Jeito</h1>
      <div id="investimentos">
        <Card nome={"NFT's"} imagem={nfts} texto={"blábláblábláblábláblábláblá blábláblá"}/>
        <Card nome={"EFT's"} imagem={efts} texto={"blábláblábláblábláblábláblá blábláblá"}/>
        <Card nome={"Ações"} imagem={acoes} texto={"blábláblábláblábláblábláblá blábláblá"}/>
        
      </div>
    </section>);
}
function TreinarInvestimento(){
    return (
        <section id="treinarInvestimento">
            <div id="infos">
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
        </section>
    )
}
function SimularInvestimento() {
  return(
  <>
  <div className="titulo_section">
    <h1 id="titulo">Faça sua simulação</h1>
  </div>
    <p id="subtituloSession">Preencha os campos corretamente</p>
    <section id="simulacao">
        <div id="formsSimulacao">
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
    </section>
    </>
    );
  
}
function Card_Longo_Prazo({porcentagem}){
    return(
        <div class="produtos">
            <div class="barra">
                <h2>CDB - Certificado de Depósito Bancário</h2>
                <div class="barra-exterior">
                    <div class="barra-interior"></div>
                    <p>{}/100</p>
                </div>
            </div>
             <div class="text-card">
                <h3>Title</h3>
                    <p>Please add your content here. Keep it short and simple. And smile.
                    Please add your content here. Keep it short and simple. And smile.</p>
            </div>
        </div>
    )
}
function InvestimentoLongoPrazo(){
  return <>
            <div className="titulo_section">
            <h1 id="tituloSession">Invista a longo tempo</h1>
            <p id="subtituloSession">produtos de renda fixa</p>
            </div>
            <section id="rendaFixa">
                <Card_Longo_Prazo porcentagem={50}/>
                <Card_Longo_Prazo porcentagem={90}/>
                <Card_Longo_Prazo porcentagem={43}/>
            </section>
        </>
}

function Rodape(){
  return (

    <section id="rodape">
    <div class="rodape">
    <h2>Faça parte agora do nosso Projeto</h2>
    <p>WebCota o melhor treino para o sucesso no investimento</p>
    <div class="rodape-buttons">
      <button class="outline">Doação</button>
      <button class="solid">Cadastrar</button>
    </div>
  </div>
    </section>

  )
}

export default function Home(){
    return(
        <>
            <Navbar logo={logo}/>
            <ColocarImagem imagem={imagem} texto={"Simule seus investimentos conosco"}/>
            <Investimentos/>
            <TreinarInvestimento/>
            <SimularInvestimento/>
            <InvestimentoLongoPrazo/>
            <Rodape/>
            <Footer/>
        </>
    )
}
