import React from "react";
import { Link } from "react-router-dom";
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
        <h1>Gráficos das Ações</h1>
        <div className="tradingview-widget-container" ref={container}>
        </div>
        
    </div>
  );
}

export function TradingViewTickerTape() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current){
      return;
  }else if(containerRef.current.querySelector("script")){
      return;
  }
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.type = "text/javascript";
    script.textContent = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { description: "", proName: "BMFBOVESPA:JBSS3" },
        { description: "", proName: "NASDAQ:NVDA" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "br",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="fitaAcoes">
      <h1>Ações</h1>
      <div className="tradingview-widget-container" ref={containerRef}></div>
    </div>
  );
}


export default function Graficos() {
  return (
      <>
      <TradingViewTickerTape/>
      <TradingViewWidget/>

      <Footer/>
      </>
  );
}

