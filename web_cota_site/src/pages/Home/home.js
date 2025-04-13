import React from "react";
import imagem from "../../assets/pana.svg"
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
import { useRef, useState } from "react";
import jsPDF from "jspdf";


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
      <div id="titulo">
        <h1>Invista do Seu Jeito</h1>
        <h3 style={{
          fontWeight: 200
        }}>Produtos de renda variável</h3>
      </div>
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
  const [formData, setFormData] = useState({
    tipoInvest: '',
    investir: '',
    deposito: '',
    tempo: '',
  });

  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'radio' ? (checked ? value : prev[name]) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = new jsPDF();

    doc.text("Simulação de Investimento", 20, 20);
    doc.text(`Tipo de Investimento: ${formData.tipoInvest}`, 20, 40);
    doc.text(`Valor Inicial: R$ ${formData.investir}`, 20, 50);
    doc.text(`Depósito Mensal: R$ ${formData.deposito}`, 20, 60);
    doc.text(`Tempo (meses): ${formData.tempo}`, 20, 70);

    doc.save("simulacao_investimento.pdf");
  };

  return (
    <>
      <div className="titulo_section">
        <h1>Faça sua Simulação</h1>
        <h3 style={{ fontWeight: 200 }}>Preencha corretamente</h3>
      </div>
      <section id="simulacao">
        <div id="formsSimulacao">
          <div id="formulario">
            <form ref={formRef} onSubmit={handleSubmit}>
            <div id="tipoInvest">
            <ul>
              <li>
                <input
                  type="radio"
                  name="tipoInvest"
                  value="LCI/LCA"
                  id="input1"
                  onChange={handleChange}
                />
                <label
                  id="opcao1"
                  htmlFor="input1"
                  className={formData.tipoInvest === "LCI/LCA" ? "selected" : ""}
                >
                  LCI/LCA
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name="tipoInvest"
                  value="CDB"
                  id="input2"
                  onChange={handleChange}
                />
                <label
                  id="opcao2"
                  htmlFor="input2"
                  className={formData.tipoInvest === "CDB" ? "selected" : ""}
                >
                  CDB
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name="tipoInvest"
                  value="Tesouro Direto"
                  id="input3"
                  onChange={handleChange}
                />
                <label
                  id="opcao3"
                  htmlFor="input3"
                  className={formData.tipoInvest === "Tesouro Direto" ? "selected" : ""}
                >
                  Tesouro Direto
                </label>
              </li>
            </ul>
          </div>
              <div id="inputs">
                <label htmlFor="investir">Quanto gostaria de investir?</label>
                <input
                  type="number"
                  id="investir"
                  name="investir"
                  onChange={handleChange}
                />

                <label htmlFor="deposito">Quanto gostaria de depositar por mês?</label>
                <input
                  type="number"
                  id="deposito"
                  name="deposito"
                  onChange={handleChange}
                />

                <label htmlFor="tempo">Por quanto tempo deixaria o dinheiro investido?</label>
                <input
                  type="number"
                  id="tempo"
                  name="tempo"
                  onChange={handleChange}
                />

                <input type="submit" value="Simular" id="simularBotao" />
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

function Card_Longo_Prazo({porcentagem, titulo, descricao}){
    return(
        <div class="produtos">
            <div class="barra">
                <h2>{titulo}</h2>
              <p style={{
                color:"white",
                position: "relative",
                right: "30px",
                top:"40px"
              }}>Participação de mercado</p>
                <div class="barra-exterior">
                <div className="barra-interior"></div>
                <p>{porcentagem}/100</p>
                </div>
            </div>
             <div class="text-card">
                <h3>Descrição</h3>
                    <p>{descricao}</p>
            </div>
        </div>
    )
}
function InvestimentoLongoPrazo(){
  return <>
            <div className="titulo_section">
            <h1 id="tituloSection">Invista a longo tempo</h1>
            <p id="subtituloSection">Produtos de renda fixa</p>
            </div>
            <section id="rendaFixa">
            <Card_Longo_Prazo
              porcentagem={50}
              titulo="Tesouro Selic"
              descricao="Indicado para reserva de emergência, com alta liquidez e segurança."
            />
            <Card_Longo_Prazo
              porcentagem={90}
              titulo="CDB de Longo Prazo"
              descricao="Oferece rentabilidade atrelada ao CDI, ideal para metas acima de 2 anos."
            />
            <Card_Longo_Prazo
              porcentagem={43}
              titulo="LCI Imobiliária"
              descricao="Isento de IR, ótimo para diversificar e ter retorno acima da poupança."
            />
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
