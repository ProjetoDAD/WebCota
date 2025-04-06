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
        <button>descubra mais</button>
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
        <Card nome={"NFT's"} imagem={nfts} texto={"blábláblábláblábláblábláblá blábláblá"} />
        <Card nome={"EFT's"} imagem={efts} texto={"blábláblábláblábláblábláblá blábláblá"} />
        <Card nome={"Ações"} imagem={acoes} texto={"blábláblábláblábláblábláblá blábláblá"} />
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
  const chartInstanceRef = useRef(null); // Armazena a instância do gráfico
  const [graficoData, setGraficoData] = useState([]);

  // Criação do gráfico
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroi gráfico anterior
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Dados padrões se não houver dados de simulação
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

  // Lógica para simular juros compostos
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

    // Taxa de juros mensal estimada por tipo
    const taxas = {
      "LCI/LCA": 0.009, // 0.9% ao mês
      "CDB": 0.012,     // 1.2% ao mês
      "Tesouro Direto": 0.01, // 1% ao mês
    };

    const taxaJurosMensal = taxas[tipoInvest] || 0.01;

    const dadosSimulados = calcularInvestimento(investir, deposito, tempo, taxaJurosMensal);
    setGraficoData(dadosSimulados);

    // Geração do PDF
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Simulação de Investimento", 20, 20);
    doc.setFontSize(12);
    doc.text(`Tipo de Investimento: ${tipoInvest}`, 20, 40);
    doc.text(`Valor Inicial: R$ ${investir}`, 20, 50);
    doc.text(`Depósito Mensal: R$ ${deposito}`, 20, 60);
    doc.text(`Tempo: ${tempo} meses`, 20, 70);
    doc.text(`Taxa de Juros Mensal Estimada: ${(taxaJurosMensal * 100).toFixed(2)}%`, 20, 80);

    // Captura do gráfico
    const canvas = chartRef.current;
    const canvasImage = await html2canvas(canvas);
    const imgData = canvasImage.toDataURL("image/png");

    doc.addImage(imgData, "PNG", 20, 90, 170, 90);
    doc.save("simulacao_com_grafico.pdf");
  };

  return (
    <>
      <div id="tituloTal">
        <h1>Faça sua Simulação</h1>
        <h3 style={{ fontWeight: 200 }}>Preencha corretamente</h3>
      </div>
      <section id="simulacao">
        <div id="formsSimulacao">
          <div id="formulario">
            <form onSubmit={handleSubmit}>
              <div id="tipoInvest">
                <ul>
                  <li>
                    <input type="radio" name="tipoInvest" value="LCI/LCA" />
                    <label>LCI/LCA</label>
                  </li>
                  <li>
                    <input type="radio" name="tipoInvest" value="CDB" />
                    <label>CDB</label>
                  </li>
                  <li>
                    <input type="radio" name="tipoInvest" value="Tesouro Direto" />
                    <label>Tesouro Direto</label>
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

                <input type="submit" value="Simular" />
              </div>
            </form>
          </div>
          <div id="gerarPdf">
            <h1>Seu PDF</h1>
            <p>Gráfico abaixo será incluso no PDF:</p>
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


function Card_Longo_Prazo({ porcentagem }) {
  return (
    <div className="produtos">
      <div className="barra">
        <h2>CDB - Certificado de Depósito Bancário</h2>
        <div className="barra-exterior">
          <div className="barra-interior" style={{ width: `${porcentagem}%` }}></div>
          <p>{porcentagem}/100</p>
        </div>
      </div>
      <div className="text-card">
        <h3>Title</h3>
        <p>Please add your content here. Keep it short and simple. And smile.</p>
      </div>
    </div>
  );
}

function InvestimentoLongoPrazo() {
  return (
    <>
      <div className="titulo_section">
        <h1 id="tituloSession">Invista a longo tempo</h1>
        <p id="subtituloSession">produtos de renda fixa</p>
      </div>
      <section id="rendaFixa">
        <Card_Longo_Prazo porcentagem={50} />
        <Card_Longo_Prazo porcentagem={90} />
        <Card_Longo_Prazo porcentagem={43} />
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
          <button className="solid">Cadastrar</button>
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
