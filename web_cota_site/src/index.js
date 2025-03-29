import React from 'react';
import ReactDOM from 'react-dom/client';
import './estilo/index.css';
import './estilo/navbar.css';
import './estilo/invistaSeuJeito.css'
import './estilo/treinarInvestimentos.css'
import './estilo/produtosRendaFixa.css'
import './estilo/rodape.css'

import App from './App';
import { Investimentos, TreinarInvestimento } from './App';
import nfts from './assets/nfts.svg'
import efts from './assets/efts.svg'
import acoes from './assets/acoes.svg'
import { ColocarImagem, NavBar} from './App';
import { SimularInvestimento } from './App';
import { InvestimentoLongoPrazo } from './App';
import { Rodape, Footer } from './App';
import imagem from './assets/pana.svg'

const header = ReactDOM.createRoot(document.getElementById('header'));
header.render(
  <NavBar/>
);

const corpo = ReactDOM.createRoot(document.getElementById('imagemTexto'))

corpo.render(
  <ColocarImagem imagem={imagem} texto="Simule seus investimentos conosco"/>
  
)

const invest = ReactDOM.createRoot(document.getElementById('investimentos'))
invest.render(
  <>
    <Investimentos nome={"NFT's"} texto={"blábláblábláblábláblábláblá blábláblá"} imagem={nfts}/>
    <Investimentos nome={"EFT's"} texto={"blábláblábláblábláblábláblá blábláblá"} imagem={efts}/>
    <Investimentos nome={"Ações"} texto={"blábláblábláblábláblábláblá blábláblá"} imagem={acoes}/>
  </>
)
const treinar = ReactDOM.createRoot(document.getElementById('treinarInvestimento'))

treinar.render(
  <TreinarInvestimento/>
)
const simular = ReactDOM.createRoot(document.getElementById("simulacao"))
simular.render(
  <SimularInvestimento/>
)
const rendaFIxa = ReactDOM.createRoot(document.getElementById('rendaFixa'))
rendaFIxa.render(
  <>
    <InvestimentoLongoPrazo/>
    <InvestimentoLongoPrazo/>
    <InvestimentoLongoPrazo/>
  </>
)

const rodape = ReactDOM.createRoot(document.getElementById('rodape'))
rodape.render(
  <Rodape/>
)

const footer = ReactDOM.createRoot(document.getElementById('footer'))
footer.render(
  <Footer/>
)