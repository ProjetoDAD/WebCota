import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../hooks/UseAuth";
import "./Perfil.css";
import avatarImagem from "../../assets/avatar.svg"; 
import eyeIcon from '../../assets/eye.svg';
import eyeOffIcon from '../../assets/eyeOff.svg';
import logout from "../../assets/logOut.svg";

function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("Dados");

  const [formData, setFormData] = useState({
    senha: "",
    email: "",
    celular: "",
    nomeUsuario: ""
  });

  useEffect(() => {
    const loggedUser_Cookie = getCookie("user");
    if (!loggedUser_Cookie) {
      navigate("/login"); 
    } else {
      try {
        const loggedUser = JSON.parse(loggedUser_Cookie);
        setUser(loggedUser);
        setFormData({
          id: loggedUser.id || "",
          senha: loggedUser.senha || "",
          email: loggedUser.email || "",
          celular: loggedUser.celular || "",
          nomeUsuario: loggedUser.nomeUsuario || ""
        });
      } catch (error) {
        console.error("Erro ao analisar o cookie do usuário:", error);
        navigate("/login"); 
      }
    }
  }, [navigate]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/atualizar", {
        method: "PUT",
        headers: {
          "id": formData.id,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      window.location.reload(); 


      if (!response.ok) {
        throw new Error("Erro ao atualizar o perfil");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setActiveTab("Dados"); 
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Falha ao atualizar perfil");
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img src={avatarImagem} alt="Avatar" className="perfil-avatar" />
        <div className="perfil-info">
          <strong>{user ? user.nomeUsuario : "Usuário"}</strong>
          <p>{user ? user.email : "email@example.com"}</p>
        </div>
      </div>

      <div className="perfil-nav">
        <ul>
          <li 
            className={`links ${activeTab === "Dados" ? "active" : ""}`}
            onClick={() => setActiveTab("Dados")}
          >
            Dados
          </li>
          <li 
            className={`links ${activeTab === "Alterar dados" ? "active" : ""}`}
            onClick={() => setActiveTab("Alterar dados")}
          >
            Alterar dados
          </li>
          <li>
            <div id="hamburguer">&#9776;</div>
          </li>
        </ul>
      </div>

      <div className="perfil-config">
        {user ? (
          activeTab === "Dados" ? (
            <div className="info-publica">
              <h3>Suas informações</h3>
              <h2 style={{ fontSize: "small", fontWeight: "200" }}>Informações pessoais</h2>
              <p><strong>Nome:</strong> {user.nomeUsuario}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Celular:</strong> {user.celular}</p>
              <p id="botao">
                <strong>Senha:</strong> {showPassword ? "123456" : "******"}
                <button onClick={() => setShowPassword(!showPassword)}>
                  <img 
                    src={showPassword ? eyeOffIcon : eyeIcon} 
                    alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </p>
            </div>
          ) : (
            <div className="info-privada">
              <h3>Alterar informações</h3>
              <h2 style={{fontWeight: "200"}}>Editar suas informações pessoais</h2>
              <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                  type="text"
                  name="nomeUsuario"
                  value={formData.nomeUsuario}
                  onChange={handleChange}
                />

                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label>Celular:</label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                />

                <label>Senha:</label>
                <input
                  type="text"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                />

                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setActiveTab("Dados")}>Cancelar</button>
              </form>
            </div>
          )
        ) : (
          <div className="info-publica">
            <h2>Você ainda não tem um cadastro!</h2>
            <p>Deseja se cadastrar agora?</p>
            <button onClick={() => navigate("/cadastro")}>Cadastrar</button>
          </div>
        )}
      </div>

      {user && (
        <button id="botaoLogout" onClick={() => navigate("/logout")}>
          <img 
            src={logout} 
            alt="Sair do seu perfil"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      )}
    </div>
  );
}

export default Perfil;
