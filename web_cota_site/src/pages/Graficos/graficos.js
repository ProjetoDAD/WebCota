import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import "../../components/AboveTheFold/aboveTheFold.css"
import AboveTheFold from "../../components/AboveTheFold/aboveTheFold"
import imagem from "../../assets/pana.svg"
import "./grafico.css"
// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    () => {
        if (!container.current){
            return;
        }else if(container.current.querySelector("script")){
            return;
        }
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|1D"
            ],
            [
              "Google",
              "GOOGL|1D"
            ],
            [
              "Microsoft",
              "MSFT|1D"
            ],
            [
              "Bitcoin",
              "BITSTAMP:BTCUSD|1D"
            ],
            [
               "Tesla",
               "NASDAQ:TSLA|1D"
            ],
            [
               "NVIDIA",
               "NASDAQ:NVDA|1D"
            ],
            [
               "JBS",
               "BMFBOVESPA:JBSS3|1D"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "%",
          "locale": "en",
          "colorTheme": "light",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "bars",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "headerFontSize": "medium",
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="grafico">
        <h1>Veja as principais Ações</h1>
        <div className="tradingview-widget-container" ref={container}>
        </div>
        
    </div>
  );
}


export default function Graficos() {
  return (
      <>
      <AboveTheFold imagem={imagem} texto={"Simule seus investimentos conosco"}/>
      <TradingViewWidget/>
      <Footer/>
      </>
  );
}

