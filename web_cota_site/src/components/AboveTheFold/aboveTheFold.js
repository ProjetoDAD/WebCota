import React from "react";

export default function ColocarImagem({imagem, texto}){
    return(
            <section id="imagemTexto">
                <div>
                <div id="imagem">
                    <img src={imagem}></img>
                </div>
                <div id="texto">
                    <h1>{texto}</h1>
                </div>
            </div>
            </section> 
    );
}
