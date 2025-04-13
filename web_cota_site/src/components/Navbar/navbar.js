import { BrowserRouter,Link } from "react-router-dom";
import logo from "../../assets/logo.svg"

function NavBar() {
    return (
      <>
          <div id="nav">
                <img src={logo} alt="" />
                <ul>
                    <li class="links"><Link to="/" className="meu-link">Simulação</Link></li>
                    <li class="links"><Link to="/graficos" className="meu-link">Gráficos</Link></li>
                    <li class="links"><Link to="/perfil" className="meu-link">Perfil</Link></li>
                    <li >
                      <div id="hamburguer">
                        &#9776; 
                      </div>
                    </li>
                </ul>
            </div>
          </>
    );
}

export default NavBar;