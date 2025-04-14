import { useEffect, useRef, React, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Chart from "chart.js/auto";
import imagem from "../../assets/pana.svg";
import Footer from "../../components/Footer/footer";
import nfts from '../../assets/nfts.svg';
import efts from '../../assets/efts.svg';
import acoes from '../../assets/acoes.svg';
import "../../components/Navbar/navbar.css";
import "../../components/Footer/footer.css";
import "./invistaSeuJeito.css";
import "./index.css";
import "./produtosRendaFixa.css";
import "./treinarInvestimentos.css";
import { display } from "html2canvas"

function ColocarImagem({ imagem, texto }) {
  return (
    <section id="imagemTexto">
      <div>
        <div id="imagem">
          <img src={imagem} alt="Ilustração" />
        </div>
        <div id="texto">
          <h1>{texto}!</h1>
        </div>
      </div>
    </section>
  );
}

function Card({ nome, texto, imagem }) {
  return (
    <div className="elementos">
      <div className="informacoes">
        <h1>{nome}</h1>
        <p>{texto}</p>
        <button>Descubra mais</button>
      </div>
      <img src={imagem} alt={nome} />
    </div>
  );
}

function Investimentos() {
  return (
    <section id="invistaSeuJeito">
      <div id="titulo">
        <h1>Invista do Seu Jeito</h1>
        <h3 style={{ fontWeight: 200 }}>Produtos de renda variável</h3>
      </div>
      <div id="investimentos">
        <Card nome={"NFT's"} imagem={nfts} texto={"NFTs são ativos digitais únicos registrados em blockchain."} />
        <Card nome={"EFT's"} imagem={efts} texto={"ETFs são fundos de investimento negociados na bolsa de valores."} />
        <Card nome={"Ações"} imagem={acoes} texto={"Ações são partes do capital de uma empresa que podem ser compradas por investidores na bolsa de valores."} />
      </div>
    </section>
  );
}

function TreinarInvestimento() {
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
              <h1>Um pdf do investimento será enviado por email</h1>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function SimularInvestimento() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [graficoData, setGraficoData] = useState([]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = ["0", "6 meses", "1 ano", "2 anos", "3 anos"];
    const dados = graficoData.length > 0 ? graficoData : [1000, 1200, 1600, 2200, 3000];

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Evolução do Investimento (R$)",
          data: dados,
          borderColor: "blue",
          backgroundColor: "lightblue",
          tension: 0.4
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [graficoData]);

  const calcularInvestimento = (valorInicial, depositoMensal, tempoMeses, taxaJurosMensal) => {
    const valores = [];
    let montante = parseFloat(valorInicial);

    for (let i = 0; i <= tempoMeses; i += Math.floor(tempoMeses / 4) || 1) {
      let periodo = i;
      let valor = parseFloat(valorInicial) * Math.pow(1 + taxaJurosMensal, periodo);
      for (let j = 1; j <= periodo; j++) {
        valor += parseFloat(depositoMensal) * Math.pow(1 + taxaJurosMensal, periodo - j);
      }
      valores.push(Math.round(valor));
    }

    return valores;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tipoInvest = document.querySelector('input[name="tipoInvest"]:checked')?.value || "Não selecionado";
    const investir = parseFloat(document.getElementById("investir").value || 0);
    const deposito = parseFloat(document.getElementById("deposito").value || 0);
    const tempo = parseInt(document.getElementById("tempo").value || 0);

    const taxas = {
      "LCI/LCA": 0.009, 
      "CDB": 0.012,     
      "Tesouro Direto": 0.01, 
    };

    const taxaJurosMensal = taxas[tipoInvest] || 0.01;

    const dadosSimulados = calcularInvestimento(investir, deposito, tempo, taxaJurosMensal);
    setGraficoData(dadosSimulados);

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Simulação de Investimento", 20, 20);
    doc.setFontSize(12);
    doc.text(`Tipo de Investimento: ${tipoInvest}`, 20, 40);
    doc.text(`Valor Inicial: R$ ${investir}`, 20, 50);
    doc.text(`Depósito Mensal: R$ ${deposito}`, 20, 60);
    doc.text(`Tempo: ${tempo} meses`, 20, 70);
    doc.text(`Taxa de Juros Mensal Estimada: ${(taxaJurosMensal * 100).toFixed(2)}%`, 20, 80);

    const canvas = chartRef.current;
    const canvasImage = await html2canvas(canvas);
    const imgData = canvasImage.toDataURL("image/png");

    doc.addImage(imgData, "PNG", 20, 90, 170, 90);
    doc.save("simulacao_com_grafico.pdf");
  };

  return (
    <>
      <div className="titulo_section">
        <h1 id="tituloSession">Faça a sua simulação</h1>
        <p id="subtituloSession">Preencha corretamente</p>
      </div>
      <section id="simulacao">
        <div id="formsSimulacao">
          <div id="formulario">
            <form onSubmit={handleSubmit}>
              <div id="tipoInvest">
                <ul>
                  <li>
                    <input type="radio" id="lci" name="tipoInvest" value="LCI/LCA" />
                    <label htmlFor="lci">LCI/LCA</label>
                  </li>
                  <li>
                    <input type="radio" id="cdb" name="tipoInvest" value="CDB" />
                    <label htmlFor="cdb">CDB</label>
                  </li>
                  <li>
                    <input type="radio" id="tesouro" name="tipoInvest" value="Tesouro Direto" />
                    <label htmlFor="tesouro">Tesouro Direto</label>
                  </li>
                </ul>
              </div>
              <div id="inputs">
                <label htmlFor="investir">Quanto gostaria de investir?</label>
                <input type="number" id="investir" name="investir" />

                <label htmlFor="deposito">Quanto gostaria de depositar por mês?</label>
                <input type="number" id="deposito" name="deposito" />

                <label htmlFor="tempo">Por quanto tempo deixaria o dinheiro investido? (em meses)</label>
                <input type="number" id="tempo" name="tempo" />

                <input id="simularBotao" type="submit" value="Simular" />
              </div>
            </form>
          </div>
          <div id="gerarPdf">
            <h1>Seu PDF</h1>
            <canvas
              ref={chartRef}
              width="300"
              height="200"
              style={{ border: "1px solid #ccc" }}
            ></canvas>
          </div>
        </div>
      </section>
    </>
  );
}


function Card_Longo_Prazo({ porcentagem, titulo, mensagem }) {
  return (
    <div className="produtos">
      <div className="barra">
        <h2>{titulo}</h2>
        <div className="barra-exterior">
          <div className="barra-interior" style={{ width: `${porcentagem}%` }}></div>
          <p>{porcentagem}/100</p>
        </div>
      </div>
      <div className="text-card">
        <h3>Descrição</h3>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}

function InvestimentoLongoPrazo() {
  return (
    <>
      <div className="titulo_section">
        <h1 id="tituloSession">Invista a longo tempo</h1>
        <p id="subtituloSession">Produtos de renda fixa</p>
      </div>
      <section id="rendaFixa">
        <Card_Longo_Prazo porcentagem={50} titulo={"CDB - Certificado de Depósito Bancário"} mensagem={"Um título emitido por bancos para captar dinheiro dos investidores. Em troca, o banco paga juros sobre esse valor."}/>
        <Card_Longo_Prazo porcentagem={90} titulo={"Tesouro Direto - IPCA"} mensagem={"Título público emitido pelo governo, que acompanha a inflação (IPCA) + uma taxa fixa."}/>
        <Card_Longo_Prazo porcentagem={43} titulo={"FIIs - Fundos Imobiliários"} mensagem={"Fundos que investem em imóveis físicos (como shoppings e galpões) ou em títulos ligados ao setor."}/>
      </section>
    </>
  );
}

function Rodape() {
  return (
    <section id="rodape">
      <div className="rodape">
        <h2>Faça parte agora do nosso Projeto</h2>
        <p>WebCota o melhor treino para o sucesso no investimento</p>
        <div className="rodape-buttons">
          <button className="outline">Doação</button>
          <button className="solid" style={{textDecoration:"none"}}><a href="/cadastro" >Cadastrar</a></button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <ColocarImagem imagem={imagem} texto={"Simule seus investimentos conosco"} />
      <Investimentos />
      <TreinarInvestimento />
      <SimularInvestimento />
      <InvestimentoLongoPrazo />
      <Rodape />
      <Footer />
    </>
  );
}