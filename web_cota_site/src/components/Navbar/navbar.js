import { BrowserRouter,Link } from "react-router-dom";

function NavBar({logo}) {
    return (
      <>
          <div id="nav">
                <img src={logo} alt="" />
                <ul>
                    <li class="links"><Link to="/simulacao" className="meu-link">Simulação</Link></li>
                    <li class="links"><Link to="/graficos" className="meu-link">Gráficos</Link></li>
                    <li class="links"><Link to="/artigos" className="meu-link">Artigos</Link></li>
                    <li class="links"><Link to="/perfil" className="meu-link">Perfil</Link></li>
                    <li >
                      <div id="hamburguer"v>
                        &#9776; 
                      </div>
                    </li>
                </ul>
            </div>
          </>
    );
}

export default NavBar;