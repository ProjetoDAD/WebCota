import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Investimentos, TreinarInvestimento } from './App';
import nfts from './assets/nfts.svg'
import efts from './assets/efts.svg'
import acoes from './assets/acoes.svg'
import { ColocarImagem, NavBar } from './App';

const header = ReactDOM.createRoot(document.getElementById('header'));
header.render(
  <NavBar/>
);

const corpo = ReactDOM.createRoot(document.getElementById('imagemTexto'))

corpo.render(
  <ColocarImagem/>
  
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